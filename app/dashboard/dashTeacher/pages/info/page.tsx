// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent } from "@/components/ui/card"
// import { useDispatch, useSelector } from 'react-redux';
// import DashTeacher from "@/app/dashboard/dashTeacher/dashTeacher"
// import { changeGlobalName } from '@/features/auth/authSlice';
// import React from 'react'

// const page = () => {
//   const [userName, setUserName] = useState('');
//   const [userData, setUserData] = useState({
//     name: '',
//     password: "••••••••",
//     email: "noodsaf01@gmail.com",
//     whatsapp: "لا يوجد",
//   })
//   const dispatch = useDispatch();
//   const globalEmail = useSelector((state: { background: { globalEmail: string } }) => state.background.globalEmail);
//   const globalPassword = useSelector((state: { background: { globalPassword: string } }) => state.background.globalPassword);
//   const globalWhatsUpPhone = useSelector((state: { background: { globalWhatsUpPhone: string } }) => state.background.globalWhatsUpPhone);


//   const [editMode, setEditMode] = useState({
//     name: false,
//     password: false,
//     email: false,
//     whatsapp: false,
//   })

//   const handleEdit = (field: keyof typeof userData) => {
//     setEditMode({ ...editMode, [field]: true })
//   }

//   const handleSave = (field: keyof typeof userData, value: string) => {
//     if(field == "name"){
//       localStorage.removeItem("userName");
//       localStorage.setItem("userName",value);
//       setUserName(value);
//       // window.location.reload();
//       dispatch(changeGlobalName(value));
    
//       // dispatch(changeTitleGlobal('info'));  
//     }
//     setUserData({ ...userData, [field]: value })
//     setEditMode({ ...editMode, [field]: false })
//   }

//   const handleCancel = (field: keyof typeof userData) => {
//     setEditMode({ ...editMode, [field]: false })
//   }

// useEffect(() =>{
//   const fullName = localStorage.getItem("userName") || '';
//   setUserName(fullName);
//   setUserData(prev => ({ ...prev, name: fullName }));
//   console.log("fullName", fullName);
// }, []);

//   return (
    
//       <DashTeacher>
//     <div className="flex justify-center items-center p-4" dir="rtl">
//       <Card className="w-full max-w-md">
//         <CardContent className="pt-6">
//           <div className="space-y-4">
//             {/* Name Field */}
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4">
//               <div className="font-medium mb-2 sm:mb-0">الاسم</div>
//               <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
//                 {editMode.name ? (
//                   <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
//                     <Input defaultValue={userName} className="w-full sm:w-auto" id="name-input" />
//                     <div className="flex gap-2 mt-2 sm:mt-0">
//                       <Button
//                         size="sm"
//                         onClick={() =>
//                           handleSave("name", (document.getElementById("name-input") as HTMLInputElement).value)
//                         }
//                       >
//                         حفظ
//                       </Button>
//                       <Button size="sm" variant="outline" onClick={() => handleCancel("name")}>
//                         إلغاء
//                       </Button>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
//                     <span className="text-sm">{userName}</span>
//                     <Button variant="link" className="text-blue-600 p-0 h-auto" onClick={() => handleEdit("name")}>
//                       تعديل
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Password Field */}
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4">
//               <div className="font-medium mb-2 sm:mb-0">كلمة المرور</div>
//               <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
//                 {editMode.password ? (
//                   <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
//                     <Input type="password" defaultValue={globalPassword} className="w-full sm:w-auto" id="password-input" />
//                     <div className="flex gap-2 mt-2 sm:mt-0">
//                       <Button size="sm" onClick={() => handleSave("password", "••••••••")}>
//                         حفظ
//                       </Button>
//                       <Button size="sm" variant="outline" onClick={() => handleCancel("password")}>
//                         إلغاء
//                       </Button>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
//                     <span className="text-sm">{globalPassword}</span>
//                     <Button variant="link" className="text-blue-600 p-0 h-auto" onClick={() => handleEdit("password")}>
//                       تعديل
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Email Field */}
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4">
//               <div className="font-medium mb-2 sm:mb-0">البريد الإلكتروني</div>
//               <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
//                 {editMode.email ? (
//                   <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
//                     <Input type="email" defaultValue={globalEmail} className="w-full sm:w-auto" id="email-input" />
//                     <div className="flex gap-2 mt-2 sm:mt-0">
//                       <Button
//                         size="sm"
//                         onClick={() =>
//                           handleSave("email", (document.getElementById("email-input") as HTMLInputElement).value)
//                         }
//                       >
//                         حفظ
//                       </Button>
//                       <Button size="sm" variant="outline" onClick={() => handleCancel("email")}>
//                         إلغاء
//                       </Button>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
//                     <span className="text-sm">{globalEmail}</span>
//                     <Button variant="link" className="text-blue-600 p-0 h-auto" onClick={() => handleEdit("email")}>
//                       تعديل
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* WhatsApp Field */}
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
//               <div className="font-medium mb-2 sm:mb-0">رقم واتساب</div>
//               <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
//                 {editMode.whatsapp ? (
//                   <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
//                     <Input defaultValue={globalWhatsUpPhone} type="tel" placeholder="أدخل رقم واتساب" className="w-full sm:w-auto" id="whatsapp-input" />
//                     <div className="flex gap-2 mt-2 sm:mt-0">
//                       <Button
//                         size="sm"
//                         onClick={() =>
//                           handleSave(
//                             "whatsapp",
//                             (document.getElementById("whatsapp-input") as HTMLInputElement).value || "لا يوجد",
//                           )
//                         }
//                       >
//                         حفظ
//                       </Button>
//                       <Button size="sm" variant="outline" onClick={() => handleCancel("whatsapp")}>
//                         إلغاء
//                       </Button>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
//                     <span className="text-sm">{globalWhatsUpPhone}</span>
//                     <Button variant="link" className="text-blue-600 p-0 h-auto" onClick={() => handleEdit("whatsapp")}>
//                       {userData.whatsapp === "لا يوجد" ? "إضافة" : "تعديل"}
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//     </DashTeacher>
//   )
// }

// export default page

















"use client"

import { useState, useEffect } from "react"
import DashTeacher from "@/app/dashboard/dashTeacher/dashTeacher"

const ProfileSettings = () => {
  const [userName, setUserName] = useState("")
  const [userData, setUserData] = useState({
    name: "",
    password: "••••••••",
    email: "noodsaf01@gmail.com",
    whatsapp: "لا يوجد",
  })

  const [editMode, setEditMode] = useState({
    name: false,
    password: false,
    email: false,
    whatsapp: false,
  })

  const handleEdit = (field: keyof typeof userData) => {
    setEditMode({ ...editMode, [field]: true })
  }

  const handleSave = (field: keyof typeof userData, value: string) => {
    if (field === "name") {
      localStorage.removeItem("userName")
      localStorage.setItem("userName", value)
      setUserName(value)
    }
    setUserData({ ...userData, [field]: value })
    setEditMode({ ...editMode, [field]: false })
  }

  const handleCancel = (field: keyof typeof userData) => {
    setEditMode({ ...editMode, [field]: false })
  }

  useEffect(() => {
    const fullName = localStorage.getItem("userName") || ""
    setUserName(fullName)
    setUserData((prev) => ({ ...prev, name: fullName }))
  }, [])

  return (
    <DashTeacher>
    <div className="flex justify-center items-center p-4" dir="rtl">
      <div className="w-full max-w-md bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="pt-6 px-6 pb-6">
          <div className="space-y-4">
            {/* Name Field */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-4">
              <div className="font-medium mb-2 sm:mb-0">الاسم</div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
                {editMode.name ? (
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <input
                      defaultValue={userName}
                      className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      id="name-input"
                    />
                    <div className="flex gap-2 mt-2 sm:mt-0">
                      <button
                        className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={() =>
                          handleSave("name", (document.getElementById("name-input") as HTMLInputElement).value)
                        }
                      type="button">
                        حفظ
                      </button>
                      <button
                        className="px-3 py-1.5 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        onClick={() => handleCancel("name")}
                      type="button">
                        إلغاء
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
                    <span className="text-sm">{userName}</span>
                    <button
                      className="text-blue-600 text-sm hover:text-blue-800 focus:outline-none"
                      onClick={() => handleEdit("name")}
                    type="button">
                      تعديل
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-4">
              <div className="font-medium mb-2 sm:mb-0">كلمة المرور</div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
                {editMode.password ? (
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <input
                      type="password"
                      defaultValue="password123"
                      className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      id="password-input"
                    />
                    <div className="flex gap-2 mt-2 sm:mt-0">
                      <button
                        className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={() => handleSave("password", "••••••••")}
                      type="button">
                        حفظ
                      </button>
                      <button
                        className="px-3 py-1.5 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        onClick={() => handleCancel("password")}
                      type="button">
                        إلغاء
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
                    <span className="text-sm">••••••••</span>
                    <button
                      className="text-blue-600 text-sm hover:text-blue-800 focus:outline-none"
                      onClick={() => handleEdit("password")}
                    type="button">
                      تعديل
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-4">
              <div className="font-medium mb-2 sm:mb-0">البريد الإلكتروني</div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
                {editMode.email ? (
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <input
                      type="email"
                      defaultValue={userData.email}
                      className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      id="email-input"
                    />
                    <div className="flex gap-2 mt-2 sm:mt-0">
                      <button
                        className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={() =>
                          handleSave("email", (document.getElementById("email-input") as HTMLInputElement).value)
                        }
                      type="button">
                        حفظ
                      </button>
                      <button
                        className="px-3 py-1.5 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        onClick={() => handleCancel("email")}
                      type="button">
                        إلغاء
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
                    <span className="text-sm">{userData.email}</span>
                    <button
                      className="text-blue-600 text-sm hover:text-blue-800 focus:outline-none"
                      onClick={() => handleEdit("email")}
                    type="button">
                      تعديل
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* WhatsApp Field */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="font-medium mb-2 sm:mb-0">رقم واتساب</div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
                {editMode.whatsapp ? (
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <input
                      defaultValue={userData.whatsapp === "لا يوجد" ? "" : userData.whatsapp}
                      type="tel"
                      placeholder="أدخل رقم واتساب"
                      className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      id="whatsapp-input"
                    />

                    <div className="flex gap-2 mt-2 sm:mt-0">
                      <button
                        className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={() =>
                          handleSave(
                            "whatsapp",
                            (document.getElementById("whatsapp-input") as HTMLInputElement).value || "لا يوجد",
                          )
                        }
                      type="button">
                        حفظ
                      </button>
                      <button
                        className="px-3 py-1.5 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        onClick={() => handleCancel("whatsapp")}
                      type="button">
                        إلغاء
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
                    <span className="text-sm">{userData.whatsapp}</span>
                    <button
                      className="text-blue-600 text-sm hover:text-blue-800 focus:outline-none"
                      onClick={() => handleEdit("whatsapp")}
                    type="button">
                      {userData.whatsapp === "لا يوجد" ? "إضافة" : "تعديل"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </DashTeacher>
  )
}

export default ProfileSettings

