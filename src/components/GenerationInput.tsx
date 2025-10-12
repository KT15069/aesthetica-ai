import { useState } from 'react';
import { Send, Image as ImageIcon, Video, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

type GenerationType = 'image' | 'video';

export function GenerationInput({ onGenerate }: { onGenerate: (prompt: string, type: GenerationType, files: File[]) => void }) {
  const [prompt, setPrompt] = useState('');
  const [type, setType] = useState<GenerationType>('image');
  const [files, setFiles] = useState<File[]>([]);
  const [isFocused, setIsFocused] = useState(false);
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
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
      className="border-t border-border bg-card p-4"
    >
      <div className="max-w-4xl mx-auto space-y-3">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex gap-2 mb-2"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant={type === 'image' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setType('image')}
              className="transition-smooth"
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              Image
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant={type === 'video' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setType('video')}
              className="transition-smooth"
            >
              <Video className="h-4 w-4 mr-2" />
              Video
            </Button>
          </motion.div>
          <motion.label
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer"
          >
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
          </motion.label>
        </motion.div>

        <motion.div
          animate={{
            scale: isFocused ? 1.02 : 1,
            boxShadow: isFocused
              ? '0 8px 30px rgba(59, 130, 246, 0.15)'
              : '0 0 0 rgba(0, 0, 0, 0)',
          }}
          transition={{ duration: 0.3 }}
          className="flex gap-2"
        >
          <Textarea
            placeholder="Describe what you want to generate..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            className="resize-none transition-smooth"
            rows={3}
          />
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              onClick={handleSubmit}
              size="icon"
              className="shrink-0 h-auto transition-smooth"
            >
              <Send className="h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
