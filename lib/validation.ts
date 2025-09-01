// import { Code } from 'lucide-react'
import z from 'zod'


// contact us =============================
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

// search المدونة ==========================
export const searchSchema = z.object({
  query: z.string(),
})

// login ==========================
export const loginSchema = z.object({
  email: z.string().email({ message: "يرجى إدخال عنوان بريد إلكتروني صالح" }),
  password: z.string().min(8, { message: "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل" })
  .regex(/^[^\s]+$/, { message: "لا يمكن أن تحتوي كلمة المرور على مسافات" }), // No spaces allowed,

})

// Define the signup schema ==================================
export const signupSchema = z.object({
  firstName: z.string().min(2, { message: "يجب أن يتكون الاسم من حرفين على الأقل" }),
  lastName: z.string().min(2, { message: "يجب أن يتكون الاسم من حرفين على الأقل" }),
  password: z
    .string()
    .min(8, { message: "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل" })
    .regex(/[a-zA-Z]/, { message: "يجب أن تحتوي على حرف واحد على الأقل" })
    .regex(/[0-9]/, { message: "يجب أن تحتوي على رقم واحد على الأقل" })
    .regex(/[^a-zA-Z0-9]/, { message: "يجب أن تحتوي على رمز خاص واحد على الأقل" })
    .regex(/^[^\s]+$/, { message: "لا يمكن أن تحتوي كلمة المرور على مسافات" }), // No spaces allowed
  email: z.string().email({ message: "يرجى إدخال عنوان بريد إلكتروني صالح" }),
  code: z.string(),
})
  