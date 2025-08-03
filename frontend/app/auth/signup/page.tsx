'use client';

import UserService from '@/app/services/User';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      console.log(formData);
      setLoading(true);
      const res = await UserService.register(formData)

      if (res.data.success) {
        toast.success("Account created Successfully!!");
        setTimeout(() => {
          router.push("/auth/login");
        })
      }
    } catch (error) {
      console.log("error", error)
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-[#374c3c]">

      <div className="relative md:w-1/2 w-full h-64 md:h-full">
        <Image
          src="/yoga.jpg"
          alt="Sign Up Visual"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex items-center justify-center md:w-1/2 w-full p-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-6 bg-white p-8 rounded-lg shadow-lg"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800">Create an Account</h2>

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <Button type="submit" className="w-full bg-[#13361C] p-6" disabled={loading}>
            {loading ? "loading" : " Sign Up"}
          </Button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don&apos;t have an account?{' '}
            <Link href="/auth/login" className="underline text-primary">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}


