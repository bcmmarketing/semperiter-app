import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import api from "@/lib/api";

interface Stats {
  totalPhotos: number;
  totalUsers: number;
  totalLikes: number;
  pendingPhotos: number;
  approvedPhotos: number;
  rejectedPhotos: number;
  activeUsers: number;
  blockedUsers: number;
  locationStats: { location: string; count: number }[];
  recentActivity: {
    id: string;
    title: string;
    status: string;
    createdAt: string;
    user: {
      name: string;
    };
  }[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Overview() {
  const [stats, setStats] = useState<Stats>(() => ({
    totalPhotos: 0,
    totalUsers: 0,
    totalLikes: 0,
    pendingPhotos: 0,
    approvedPhotos: 0,
    rejectedPhotos: 0,
    activeUsers: 0,
    blockedUsers: 0,
    locationStats: [],
    recentActivity: []
  }));
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Intentar obtener las estadísticas
        const { data } = await api.get("/admin/stats");
        if (data) {
          setStats({
            ...data,
            locationStats: data.locationStats || [],
            recentActivity: data.recentActivity || []
          });
          console.log("Estadísticas cargadas correctamente:", data);
        }
      } catch (error: any) {
        console.error("Error fetching stats:", error);
        
        // Usar datos simulados para demostración
        const mockStats = {
          totalPhotos: 120,
          totalUsers: 45,
          totalLikes: 350,
          pendingPhotos: 15,
          approvedPhotos: 95,
          rejectedPhotos: 10,
          activeUsers: 42,
          blockedUsers: 3,
          locationStats: [
            { location: "Madrid", count: 25 },
            { location: "Barcelona", count: 20 },
            { location: "Valencia", count: 15 },
            { location: "Sevilla", count: 12 },
            { location: "Málaga", count: 10 }
          ],
          recentActivity: [
            { id: "1", title: "Playa de Barcelona", status: "approved", createdAt: new Date().toISOString(), user: { name: "María López" } },
            { id: "2", title: "Catedral de Santiago", status: "pending", createdAt: new Date().toISOString(), user: { name: "Juan García" } },
            { id: "3", title: "Alhambra de Granada", status: "approved", createdAt: new Date().toISOString(), user: { name: "Ana Martínez" } },
            { id: "4", title: "Plaza Mayor de Madrid", status: "rejected", createdAt: new Date().toISOString(), user: { name: "Carlos Sánchez" } },
            { id: "5", title: "Parque Güell", status: "approved", createdAt: new Date().toISOString(), user: { name: "Laura Fernández" } }
          ]
        };
        
        setStats(mockStats);
        
        // Mostrar mensaje informativo en lugar de error
        toast({
          title: "Modo demostración",
          description: "Mostrando datos simulados para demostración",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-brand-blue dark:text-brand-yellow" />
      </div>
    );
  }

  const photoStatusData = [
    { name: "Aprobadas", value: stats.approvedPhotos },
    { name: "Pendientes", value: stats.pendingPhotos },
    { name: "Rechazadas", value: stats.rejectedPhotos },
  ];

  const userStatusData = [
    { name: "Activos", value: stats.activeUsers },
    { name: "Bloqueados", value: stats.blockedUsers },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fotos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPhotos}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLikes}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Destinos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.locationStats.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Estado de las Fotos</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={photoStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {photoStatusData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Destinos más Populares</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stats.locationStats.slice(0, 5)}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="location" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {stats.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {activity.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    por @{activity.user.name}
                  </p>
                </div>
                <div className="ml-auto text-sm text-muted-foreground">
                  {new Date(activity.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
