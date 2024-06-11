import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

export const Loader: React.FC<{ className?: string }> = ({ className }) => (
  <Loader2 className={cn('h-4 w-4 animate-spin', className)} />
)
