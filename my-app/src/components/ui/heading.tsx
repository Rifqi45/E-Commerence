interface Headingprops {
    tittle: string;
    description: string;
};

export const Heading: React.FC<Headingprops> = ({
    tittle,
    description
}) => {
    return (
        <div>
            <h2 className="text-3xl font-bold tracking-tight">{tittle}</h2>
            <p className="text-sm text-muted-foreground">
                {description}
            </p>
        </div>
    )
}