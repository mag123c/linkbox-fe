import { CssBaseline, GlobalStyles } from '@mui/material';
import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AppNavBar from './components/AppNavBar';
import Home from './pages/Home';
import { fetchCategories } from './utils/apis/categoryApi';

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
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [categoryUpdated, setCategoryUpdated] = useState(false);
    const [videoUpdated, setVideoUpdated] = useState(false);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const fetchedCategories = await fetchCategories();
                setCategories(fetchedCategories);
                if (fetchedCategories.length > 0) {
                    setSelectedCategory(fetchedCategories[0]);
                }
            } catch (error) {
                console.error('카테고리 불러오기 실패:', error);
            }
        };
        loadCategories();
    }, [categoryUpdated]);

    const handleCategoryAdded = () => {
        setCategoryUpdated((prev) => !prev);
    };

    const handleVideoAdded = () => {
        setVideoUpdated((prev) => !prev);
    };

    return (
        <>
            {globalStyles}
            <CssBaseline />
            <Router>
                <AppNavBar
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryAdded={handleCategoryAdded}
                    onVideoAdded={handleVideoAdded}
                />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home
                                categories={categories}
                                selectedCategory={selectedCategory}
                                setSelectedCategory={setSelectedCategory}
                                videoUpdated={videoUpdated}
                            />
                        }
                    />
                </Routes>
            </Router>
        </>
    );
}

export default App;
