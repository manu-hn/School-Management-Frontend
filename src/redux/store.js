import { configureStore } from "@reduxjs/toolkit";
import { studentReducer } from "./slices/student/studentSlice";
import { teacherReducer } from "./slices/teacher/teacherSlice";
import { userReducer } from "./slices/user/userSlice";
import { noticeReducer } from "./slices/notice/noticeSlice";
import { complainReducer } from "./slices/complain/complainSlice";
import { sclassReducer } from "./slices/sclass/sclassSlice";


const store = configureStore({
    reducer: {
        user: userReducer,
        student: studentReducer,
        teacher: teacherReducer,
        notice: noticeReducer,
        complain: complainReducer,
        sclass: sclassReducer
    }
});

export default store;