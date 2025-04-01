import z from 'zod'



export const formSchema = z.object({
    email: z.string().email({
      message: "Please enter a valid email address",
    }),
    name: z.string().min(2, {
      message: "Name must be at least 2 characters",
    }),
    subject: z.string().min(5, {
      message: "Subject must be at least 5 characters",
    }),
    message: z.string().min(10, {
      message: "Message must be at least 10 characters",
    }),
  })
  
export const searchSchema = z.object({
  query: z.string(),
})
