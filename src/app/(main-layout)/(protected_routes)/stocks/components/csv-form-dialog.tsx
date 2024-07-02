import { stockApi } from '@/apis'
import { Button } from '@/components/shared/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shared/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/shared/form'
import { Input } from '@/components/shared/input'
import { Label } from '@/components/shared/label'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FileUp } from 'lucide-react'

const importStockSchema = z.object({
  file: z.instanceof(File).refine((file) => file.size < 7000000, {
    message: 'Your file must be less than 7MB.',
  }),
})

export default function CsvFormDialog() {
  const queryClient = useQueryClient()

  const { mutate: importStock } = useMutation({
    mutationFn: (file: File) => stockApi.createStockByCsv(file),
    onSuccess: () => {
      toast.success('Import stocks successfully')
    },
    onError: () => {
      toast.error('Error importing, please check your file format.')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'stocks' })
    },
  })

  const form = useForm<z.infer<typeof importStockSchema>>({
    resolver: zodResolver(importStockSchema),
  })

  function onSubmit(data: z.infer<typeof importStockSchema>) {
    importStock(data.file)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='bg-white flex gap-[5px] rounded-[5px] border border-secondary px-2 py-1 duration-300 hover:bg-[#EBF1FF]'>
          <FileUp size={20} className='stroke-secondary' />
          <span className='text-[15px] text-secondary max-[768px]:hidden'>Import</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Import CSV</DialogTitle>
          <DialogDescription>Import your stocks by uploading a CSV file.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            encType='multipart/form-data'
            className='grid gap-4'
          >
            <FormField
              control={form.control}
              name='file'
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormControl>
                    <div>
                      <FormLabel>File</FormLabel>
                      <Input
                        id='file'
                        className='col-span-3'
                        type='file'
                        {...fieldProps}
                        onChange={(event) => onChange(event.target.files && event.target.files[0])}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter className='sm:justify-start'>
              <DialogClose asChild>
                <div className='flex items-center gap-4'>
                  <Button
                    type='submit'
                    className='flex gap-[5px] bg-secondary duration-300 hover:bg-[#739AF4]'
                  >
                    Import
                  </Button>
                  <Button
                    type='button'
                    variant='outline'
                    className='flex gap-[5px] border-secondary text-secondary hover:bg-[#EBF1FF] hover:text-secondary'
                  >
                    Close
                  </Button>
                </div>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
