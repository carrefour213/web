import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function DeleteOrderDialog({ onDelete }: { onDelete: () => Promise<void> }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="w-28 bg-destructive text-white"
        >Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Order</DialogTitle>
          <DialogDescription>
            Do you realy wnat to Delete the Order
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className={`flex sm:justify-between`}>
          <DialogClose className="w-1/2 bg-white border text-black rounded-md">
            Cancel
          </DialogClose>
          <Button
            onClick={onDelete}
            type="button"
            className="w-1/2 bg-destructive text-white"
          >Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
