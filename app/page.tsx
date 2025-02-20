'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Brain, CheckCircle, ListTodo, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            TaskAI
            <span className="text-primary ml-2">Management</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Revolutionize your workflow with AI-powered task management. Get smart suggestions,
            real-time updates, and seamless collaboration.
          </p>
          <div className="flex gap-4 justify-center mt-8">
            <Button size="lg" onClick={() => router.push('/auth/login')}>Get Started</Button>
            <Button size="lg" variant="outline" onClick={() => router.push('/auth/register')}>Learn More</Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          <Card className="p-6 space-y-4">
            <Brain className="w-12 h-12 text-primary" />
            <h3 className="text-xl font-semibold">AI-Powered Insights</h3>
            <p className="text-muted-foreground">
              Get intelligent task suggestions and automated priority assignments based on your workflow.
            </p>
          </Card>

          <Card className="p-6 space-y-4">
            <Zap className="w-12 h-12 text-primary" />
            <h3 className="text-xl font-semibold">Real-Time Updates</h3>
            <p className="text-muted-foreground">
              Stay synchronized with your team through instant updates and live collaboration features.
            </p>
          </Card>

          <Card className="p-6 space-y-4">
            <ListTodo className="w-12 h-12 text-primary" />
            <h3 className="text-xl font-semibold">Smart Organization</h3>
            <p className="text-muted-foreground">
              Efficiently organize and track tasks with intelligent categorization and filtering.
            </p>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">99%</div>
            <div className="text-sm text-muted-foreground">Task Completion Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">24/7</div>
            <div className="text-sm text-muted-foreground">AI Assistance</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">10x</div>
            <div className="text-sm text-muted-foreground">Productivity Boost</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">5k+</div>
            <div className="text-sm text-muted-foreground">Active Users</div>
          </div>
        </div>
      </div>
    </div>
  );
}