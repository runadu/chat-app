import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// 有型別的 hooks，整個專案用這兩個，不要直接用 useDispatch / useSelector
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
