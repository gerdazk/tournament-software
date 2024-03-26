import { CardDescription, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

type SimpleCardProps = {
    title: string
    subtitle: string
    Icon?: React.FC
}

export const SimpleCard = ({title, subtitle, Icon}: SimpleCardProps) => {
    return (
        <CardHeader className="flex flex-row items-center p-0">
        {Icon && <Icon />}
        <div>
            <Label>{title}</Label>
            <CardDescription>{subtitle}</CardDescription>
        </div>
    </CardHeader>
    )
}