import { useState } from 'react';
import { Send, Image as ImageIcon, Video, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

type GenerationType = 'image' | 'video';

export function GenerationInput({ onGenerate }: { onGenerate: (prompt: string, type: GenerationType, files: File[]) => void }) {
  const [prompt, setPrompt] = useState('');
  const [type, setType] = useState<GenerationType>('image');
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!prompt.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a prompt',
        variant: 'destructive',
      });
      return;
    }
    onGenerate(prompt, type, files);
    setPrompt('');
    setFiles([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  return (
    <div className="border-t border-border bg-card p-4">
      <div className="max-w-4xl mx-auto space-y-3">
        <div className="flex gap-2 mb-2">
          <Button
            variant={type === 'image' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setType('image')}
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Image
          </Button>
          <Button
            variant={type === 'video' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setType('video')}
          >
            <Video className="h-4 w-4 mr-2" />
            Video
          </Button>
          <label className="cursor-pointer">
            <Button variant="outline" size="sm" type="button" asChild>
              <span>
                <Upload className="h-4 w-4 mr-2" />
                Upload ({files.length})
              </span>
            </Button>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        <div className="flex gap-2">
          <Textarea
            placeholder="Describe what you want to generate..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            className="resize-none"
            rows={3}
          />
          <Button onClick={handleSubmit} size="icon" className="shrink-0 h-auto">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
