import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Image, Users, Heart, MapPin, CheckCircle, XCircle, Clock } from "lucide-react"

interface StatsData {
  totalPhotos: number
  totalUsers: number
  totalLikes: number
  pendingPhotos: number
  approvedPhotos: number
  rejectedPhotos: number
  activeUsers: number
  blockedUsers: number
}

export function OverviewCards({ stats }: { stats: StatsData }) {
  const cards = [
    {
      title: "Total Fotos",
      value: stats.totalPhotos,
      icon: Image,
      description: `${stats.pendingPhotos} pendientes de moderación`
    },
    {
      title: "Total Usuarios",
      value: stats.totalUsers,
      icon: Users,
      description: `${stats.activeUsers} activos, ${stats.blockedUsers} bloqueados`
    },
    {
      title: "Total Likes",
      value: stats.totalLikes,
      icon: Heart,
    },
    {
      title: "Fotos Aprobadas",
      value: stats.approvedPhotos,
      icon: CheckCircle,
      description: `${((stats.approvedPhotos / stats.totalPhotos) * 100).toFixed(1)}% del total`
    },
    {
      title: "Fotos Pendientes",
      value: stats.pendingPhotos,
      icon: Clock,
      description: "Esperando moderación"
    },
    {
      title: "Fotos Rechazadas",
      value: stats.rejectedPhotos,
      icon: XCircle,
      description: `${((stats.rejectedPhotos / stats.totalPhotos) * 100).toFixed(1)}% del total`
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {card.title}
            </CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            {card.description && (
              <p className="text-xs text-muted-foreground mt-1">
                {card.description}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
