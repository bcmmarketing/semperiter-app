import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from 'lucide-react';

interface Comment {
  id: string;
  content: string;
  userId: string;
  photoId: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
  photo: {
    title: string;
    imageUrl: string;
  };
}

export default function CommentModeration() {
  const { token } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetchPendingComments();
  }, [token]);

  const fetchPendingComments = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/admin/comments/pending', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching pending comments:', error);
    }
  };

  const handleModeration = async (commentId: string, action: 'approve' | 'reject') => {
    try {
      await fetch(`http://localhost:3001/api/admin/comments/${commentId}/${action}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchPendingComments();
    } catch (error) {
      console.error('Error moderating comment:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 bg-gradient-to-r from-brand-navy via-brand-blue to-brand-green bg-clip-text text-transparent dark:from-brand-yellow dark:via-brand-green dark:to-brand-pink">
        Moderación de Comentarios
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {comments.map((comment) => (
          <Card key={comment.id}>
            <CardHeader>
              <CardTitle className="text-lg">Comentario en {comment.photo.title}</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center">
                  <span className="text-sm font-medium text-brand-blue">
                    {comment.user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium">{comment.user.name}</p>
                  <p className="text-xs text-muted-foreground">{comment.user.email}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <div className="w-20 h-20 relative flex-shrink-0">
                  <img
                    src={comment.photo.imageUrl}
                    alt={comment.photo.title}
                    className="absolute inset-0 w-full h-full object-cover rounded-md"
                  />
                </div>
                <div>
                  <p className="text-sm mb-1">{comment.content}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleModeration(comment.id, 'reject')}
                  className="text-red-500 hover:text-red-600"
                >
                  <X className="h-4 w-4 mr-1" />
                  Rechazar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleModeration(comment.id, 'approve')}
                  className="text-green-500 hover:text-green-600"
                >
                  <Check className="h-4 w-4 mr-1" />
                  Aprobar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
