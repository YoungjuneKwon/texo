import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { ModeSwitcher } from './components/ModeSwitcher';
import { CategoryPage } from './pages/CategoryPage';
import { DemoPage } from './pages/DemoPage';
import { LandingPage } from './pages/LandingPage';
import { LabPage } from './pages/LabPage';

export default function App(): JSX.Element {
  return (
    <div className="app-shell">
      <header className="topbar">
        <Link className="brand" to="/">
          Texo Playground
        </Link>
        <ModeSwitcher />
      </header>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pro" element={<CategoryPage />} />
        <Route path="/data" element={<CategoryPage />} />
        <Route path="/pro/:demoId" element={<DemoPage />} />
        <Route path="/data/:demoId" element={<DemoPage />} />
        <Route path="/lab" element={<LabPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
