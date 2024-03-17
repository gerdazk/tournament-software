import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export const SimpleCard = ({title, subtitle, Icon}) => {
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