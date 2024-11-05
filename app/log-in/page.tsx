"use client";

import React from 'react'
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from '@/context/auth/context';
import { useRouter } from "next/navigation"
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from "@/lib/firebase/config"
import firebaseErrors, { saveCookies } from '@/context/auth/helpers';

const userAuthSchema = z.object({
  email: z.string().email("Invalid email"),
	password: z.string().min(6, "Password must be at least 6 characters").max(20),
})

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
type FormData = z.infer<typeof userAuthSchema>


function LogIn() {
	const {register, handleSubmit, formState: { errors }} = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  })

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const router = useRouter();
  const { signInWithGoogle, setUser } = useAuth()
  const [ error, setError ] = React.useState("")


	async function onSubmit(data: FormData) {
    setIsLoading(true)
    try {
      const userData = await signInWithEmailAndPassword(auth, data.email, data.password);
      const token = await userData.user.getIdToken();
      const response = await saveCookies(token);

			if (response.status === 200) {
				router.push("/")
			}

    } catch (error: any) {
      setError(firebaseErrors(error?.code));
    } finally {
      setIsLoading(false)
    }
  }

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
          <input
              type="email"
              placeholder="email@gmail.com"
              // label="Your Email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

					<div className="grid gap-1">
            <input
              // label="Password"
              type="password"
              placeholder="********"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              {...register("password")}
            />
            {errors?.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
            {error && (
              <p className="px-1 text-xs text-red-600">
                {error}
              </p>
            )}
          </div>
					<button type="submit" color="primary">
            Sign In with Email
					</button>
        </div>
      </form>
		</div>
	)
}

export default LogIn
