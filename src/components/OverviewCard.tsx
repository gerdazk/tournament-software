import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const OverviewCard = ({ label, Icon, title, subtitle }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{label}</CardTitle>
        <Icon />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{title}</div>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </CardContent>
    </Card>
  )
}
