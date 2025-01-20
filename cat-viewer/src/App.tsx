import React, { useState, useEffect } from 'react';
import './App.css';
import CatItem from './components/CatItem';
import Tabs from './components/Tabs';
import { fetchCats } from './services/catService';

const App: React.FC = () => {
    const [cats, setCats] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<'all' | 'favorites'>('all');
    const [favoriteCats, setFavoriteCats] = useState<any[]>(() => {
        const savedFavorites = localStorage.getItem('favoriteCats');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    useEffect(() => {
        const loadCats = async () => {
            setIsLoading(true);
            const newCats = await fetchCats(10, page);
            setCats((prevCats) => [...prevCats, ...newCats]);
            setIsLoading(false);
        };
        loadCats();
    }, [page]);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - 100
            ) {
                setPage((prevPage) => prevPage + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const addToFavorites = (cat: any) => {
        const updatedFavorites = [...favoriteCats, cat];
        setFavoriteCats(updatedFavorites);
        localStorage.setItem('favoriteCats', JSON.stringify(updatedFavorites));
    };

    const removeFromFavorites = (catId: string) => {
        const updatedFavorites = favoriteCats.filter((cat) => cat.id !== catId);
        setFavoriteCats(updatedFavorites);
        localStorage.setItem('favoriteCats', JSON.stringify(updatedFavorites));
    };

    const catsToDisplay = activeTab === 'all' ? cats : favoriteCats;

    return (
        <div className="App">
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="cats-list">
                {catsToDisplay.map((cat) => (
                    <CatItem
                        key={cat.id}
                        cat={cat}
                        onAddToFavorites={addToFavorites}
                        onRemoveFromFavorites={removeFromFavorites}
                        isFavorite={favoriteCats.some((favorite) => favorite.id === cat.id)}
                    />
                ))}
            </div>
            {isLoading && <div className="loading">Загрузка...</div>}
        </div>
    );
};

export default App;
