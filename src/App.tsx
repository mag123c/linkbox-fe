import { CssBaseline, GlobalStyles } from '@mui/material';
import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { fetchCategories } from './services/categoryService';
import { Category } from './types/category';
import CategoriesPage from './pages/CategoriesPage';
import CategoryDetailPage from './pages/CategoryDetailPage';

const globalStyles = (
    <GlobalStyles
        styles={{
            body: {
                margin: 0,
                padding: 0,
                width: '100%',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: '#121212',
                color: '#ffffff',
                fontFamily: "'Noto Sans KR', sans-serif",
            },
            '#root': {
                width: '100%',
                maxWidth: '500px',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#121212',
            },
            '*': {
                boxSizing: 'border-box',
            },
        }}
    />
);

function App() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const fetchedCategories = await fetchCategories();
                setCategories(fetchedCategories);
                if (fetchedCategories.length > 0) {
                    setSelectedCategory(fetchedCategories[0].name);
                }
            } catch (error) {
                console.error('카테고리 불러오기 실패:', error);
            }
        };
        loadCategories();
    }, []);

    return (
        <>
            {globalStyles}
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/" element={<CategoriesPage />} />
                    <Route path="/categories/:categoryId" element={<CategoryDetailPage />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
