interface EmptySearchStateProps {
    title: string;
    description: string;
}

export function EmptySearchState({ title, description }: EmptySearchStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-primary/10 p-4 mb-4">
                <SearchIcon className="w-16 h-16 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground mb-2">
                {title}
            </h3>
            <p className="text-muted-foreground max-w-md">
                {description}
            </p>
        </div>
    );
}

function SearchIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={className}
            aria-hidden="true"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
            />
        </svg>
    );
}
