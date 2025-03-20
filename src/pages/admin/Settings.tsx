import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function Settings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Configuración</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notificaciones</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="new-photos" />
            <Label htmlFor="new-photos">Notificar nuevas fotos</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="new-users" />
            <Label htmlFor="new-users">Notificar nuevos usuarios</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="reports" />
            <Label htmlFor="reports">Notificar reportes de contenido</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Moderación</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="auto-approve" />
            <Label htmlFor="auto-approve">
              Aprobar automáticamente fotos de usuarios verificados
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="auto-block" />
            <Label htmlFor="auto-block">
              Bloquear automáticamente usuarios con múltiples reportes
            </Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sistema</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="maintenance" />
            <Label htmlFor="maintenance">Modo mantenimiento</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="debug" />
            <Label htmlFor="debug">Modo debug</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
