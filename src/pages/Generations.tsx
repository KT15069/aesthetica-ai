import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { User } from '@supabase/supabase-js';
import type { Tables } from '@/integrations/supabase/types';

type Generation = Tables<'generations'>;

export default function Generations() {
  const [user, setUser] = useState<User | null>(null);
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);
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
        .order('created_at', { ascending: false });

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">My Generations</h1>
        <p className="text-muted-foreground mb-8">
          All your AI-generated content in one place
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {generations.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">
                No generations yet. Start creating from the home page!
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
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground capitalize">{gen.type}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(gen.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
