import "./App.css";
import React from "react";
import DrinkList from "./components/DrinkList";
import { Route, Routes, Navigate } from "react-router-dom";
import DrinkDetails from "./components/DrinkDetails";
import HomeButton from "./components/HomeButton";
import AdminButton from "./components/AdminButton";
import StatisticPage from "./components/StatisticPage";

export default function App() {
  return (
    <div>
      <HomeButton />
      <Routes>
        <Route path="/statistic" element={<StatisticPage />} />
        <Route path="/" element={<DrinkList />} />
        <Route path="/:id" element={<DrinkDetails />} />
        <Route path="/admin" element={<AdminButton />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </div>
  );
}
