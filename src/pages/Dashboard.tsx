import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { GenerationInput } from '@/components/GenerationInput';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { User } from '@supabase/supabase-js';
import type { Tables } from '@/integrations/supabase/types';

type Generation = Tables<'generations'>;

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        loadGenerations(session.user.id);
      } else {
        navigate('/auth');
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
        loadGenerations(session.user.id);
      } else {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadGenerations = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('generations')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(12);

      if (error) throw error;
      setGenerations((data || []) as Generation[]);
    } catch (error: any) {
      toast({
        title: 'Error loading generations',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async (prompt: string, type: 'image' | 'video', files: File[]) => {
    if (!user) return;

    setGenerating(true);
    try {
      // Create generation record
      const { data: generation, error: insertError } = await supabase
        .from('generations')
        .insert({
          user_id: user.id,
          prompt,
          type,
          status: 'processing',
        })
        .select()
        .single();

      if (insertError) throw insertError;

      // TODO: Send to webhook URL
      // For now, simulate processing
      toast({
        title: 'Generation started',
        description: 'Your content is being generated...',
      });

      // Refresh generations
      await loadGenerations(user.id);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Generate AI Content</h1>
          <p className="text-muted-foreground mb-8">
            Describe your vision and let AI bring it to life
          </p>

          {generating && (
            <div className="mb-6 p-4 bg-accent/50 rounded-lg flex items-center gap-3">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Generating your content...</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {generations.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">
                  No generations yet. Start by entering a prompt below!
                </p>
              </div>
            ) : (
              generations.map((gen) => (
                <div key={gen.id} className="bg-card border border-border rounded-lg overflow-hidden hover-scale">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    {gen.result_url ? (
                      gen.type === 'video' ? (
                        <video src={gen.result_url} controls className="w-full h-full object-cover" />
                      ) : (
                        <img src={gen.result_url} alt={gen.prompt} className="w-full h-full object-cover" />
                      )
                    ) : (
                      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">{gen.prompt}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(gen.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <GenerationInput onGenerate={handleGenerate} />
    </div>
  );
}
