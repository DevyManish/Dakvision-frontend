import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function RecentSales() {
  return (
    <div className="space-y-8 ">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>PR</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Pradeep Roy</p>
          <p className="text-sm text-muted-foreground">Served in Counter 1</p>
        </div>
        <div className="ml-auto font-medium">+₹51,362.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/avatars/02.png" alt="Avatar" />
          <AvatarFallback>RG</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Rima Ghosh</p>
          <p className="text-sm text-muted-foreground">Served in Counter 2</p>
        </div>
        <div className="ml-auto font-medium">+₹39,120.81</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/03.png" alt="Avatar" />
          <AvatarFallback>SS</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Suresh Sinha</p>
          <p className="text-sm text-muted-foreground">Served in Counter 3</p>
        </div>
        <div className="ml-auto font-medium">+₹29,732.70</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/04.png" alt="Avatar" />
          <AvatarFallback>RK</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Rohan Kumar</p>
          <p className="text-sm text-muted-foreground">Served in Counter 4</p>
        </div>
        <div className="ml-auto font-medium">+₹39,912.61</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/05.png" alt="Avatar" />
          <AvatarFallback>SD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Samir Dey</p>
          <p className="text-sm text-muted-foreground">Served in Counter 5</p>
        </div>
        <div className="ml-auto font-medium">+₹39,580.11</div>
      </div>
    </div>
  );
}
