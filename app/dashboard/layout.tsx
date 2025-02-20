'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from '@/components/ui/button';
import {
  BarChart,
  Calendar,
  Layout,
  LogOut,
  Settings,
  Users,
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/auth/login');
      }
      setLoading(false);
    };

    checkUser();
  }, [router, supabase.auth]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r bg-card">
        <div className="p-4">
          <h1 className="text-2xl font-bold">TaskAI</h1>
        </div>
        <nav className="space-y-2 p-4">
          <Link href="/dashboard">
            <Button variant="ghost" className="w-full justify-start">
              <Layout className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link href="/dashboard/tasks">
            <Button variant="ghost" className="w-full justify-start">
              <Calendar className="mr-2 h-4 w-4" />
              Tasks
            </Button>
          </Link>
          <Link href="/dashboard/analytics">
            <Button variant="ghost" className="w-full justify-start">
              <BarChart className="mr-2 h-4 w-4" />
              Analytics
            </Button>
          </Link>
          <Link href="/dashboard/team">
            <Button variant="ghost" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Team
            </Button>
          </Link>
          <Link href="/dashboard/settings">
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}