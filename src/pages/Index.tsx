import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";
import { useState, useRef } from "react";

const Index = () => {
  const [likedVideos, setLikedVideos] = useState<Set<number>>(new Set());
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [securityCode, setSecurityCode] = useState('');
  const [isSecureMode, setIsSecureMode] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleLike = (videoId: number) => {
    setLikedVideos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(videoId)) {
        newSet.delete(videoId);
      } else {
        newSet.add(videoId);
      }
      return newSet;
    });
  };

  const generateSecureCode = () => {
    const code = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    return code.toUpperCase();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setUploadProgress(0);
      const newSecurityCode = generateSecureCode();
      setSecurityCode(newSecurityCode);
      
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const trendingVideos = [
    {
      id: 1,
      thumbnail: "/img/c2050e9f-e7b5-4dd2-90f3-31223195a24e.jpg",
      title: "Крутой TikTok Challenge 2024",
      author: "CreativeStudio",
      avatar: "/img/d69eef61-20c6-41a3-bf87-685c09b80384.jpg",
      views: "2.1M",
      duration: "0:15",
      likes: "150K",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      platform: "TikTok"
    },
    {
      id: 2,
      thumbnail: "/img/c2050e9f-e7b5-4dd2-90f3-31223195a24e.jpg",
      title: "YouTube обзор новых технологий",
      author: "TechReview",
      avatar: "/img/d69eef61-20c6-41a3-bf87-685c09b80384.jpg",
      views: "890K",
      duration: "12:34",
      likes: "45K",
      videoUrl: "https://www.youtube.com/embed/jNQXAC9IVRw",
      platform: "YouTube"
    },
    {
      id: 3,
      thumbnail: "/img/c2050e9f-e7b5-4dd2-90f3-31223195a24e.jpg",
      title: "Вирусный контент дня",
      author: "ViralHub",
      avatar: "/img/d69eef61-20c6-41a3-bf87-685c09b80384.jpg",
      views: "3.5M",
      duration: "0:30",
      likes: "280K",
      videoUrl: "https://www.youtube.com/embed/L_jWHffIx5E",
      platform: "TikTok"
    },
    {
      id: 4,
      thumbnail: "/img/c2050e9f-e7b5-4dd2-90f3-31223195a24e.jpg",
      title: "Эксклюзивное интервью",
      author: "ExclusiveMedia",
      avatar: "/img/d69eef61-20c6-41a3-bf87-685c09b80384.jpg",
      views: "1.2M",
      duration: "8:45",
      likes: "92K",
      videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
      platform: "YouTube"
    }
  ];

  const categories = [
    { name: "Тренды", icon: "TrendingUp", active: true },
    { name: "Музыка", icon: "Music" },
    { name: "Игры", icon: "Gamepad2" },
    { name: "Образование", icon: "BookOpen" },
    { name: "Спорт", icon: "Trophy" },
    { name: "Технологии", icon: "Smartphone" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 video-gradient rounded-xl flex items-center justify-center">
                <Icon name="Play" size={20} className="text-white ml-1" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-video-pink to-video-blue bg-clip-text text-transparent">
                VideoHub
              </h1>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Input
                  placeholder="Поиск видео, авторов, трендов..."
                  className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-gray-200 focus:border-video-pink transition-colors"
                />
                <Icon name="Search" size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Button className="video-gradient text-white font-semibold px-6 py-2 rounded-full hover:opacity-90 transition-opacity">
                <Icon name="Plus" size={18} className="mr-2" />
                Создать
              </Button>
              <Avatar className="w-10 h-10 ring-2 ring-video-pink/20 cursor-pointer hover:ring-video-pink/40 transition-all">
                <AvatarImage src="/img/d69eef61-20c6-41a3-bf87-685c09b80384.jpg" />
                <AvatarFallback>Я</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 space-y-6">
            {/* Navigation */}
            <Card className="p-6">
              <nav className="space-y-3">
                <a href="#" className="flex items-center space-x-3 p-3 rounded-lg bg-video-pink/10 text-video-pink font-medium hover:bg-video-pink/20 transition-colors">
                  <Icon name="Home" size={20} />
                  <span>Главная</span>
                </a>
                <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                  <Icon name="TrendingUp" size={20} />
                  <span>Тренды</span>
                </a>
                <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                  <Icon name="Users" size={20} />
                  <span>Подписки</span>
                </a>
                <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                  <Icon name="Heart" size={20} />
                  <span>Понравившиеся</span>
                </a>
                <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                  <Icon name="Clock" size={20} />
                  <span>История</span>
                </a>
                <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                  <Icon name="User" size={20} />
                  <span>Мой канал</span>
                </a>
              </nav>
            </Card>

            {/* Categories */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Категории</h3>
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className={`flex items-center space-x-3 w-full p-2 rounded-lg text-left transition-all hover:scale-105 ${
                      category.active
                        ? 'bg-video-blue/10 text-video-blue font-medium'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <Icon name={category.icon} size={18} />
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-8">
            {/* Hero Section */}
            <div className="video-gradient rounded-3xl p-8 text-white relative overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform duration-300">
              <div className="relative z-10">
                <h2 className="text-4xl font-bold mb-4">
                  Создавай. Делись. Вдохновляй.
                </h2>
                <p className="text-xl mb-6 opacity-90">
                  Платформа для миллионов видео из TikTok, YouTube и собственного контента
                </p>
                <div className="flex space-x-4">
                  <Button className="bg-white text-video-pink font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-all hover:scale-105">
                    <Icon name="Upload" size={20} className="mr-2" />
                    Загрузить видео
                  </Button>
                  <Button variant="outline" className="border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white/10 transition-all hover:scale-105">
                    <Icon name="Play" size={20} className="mr-2" />
                    Смотреть тренды
                  </Button>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
            </div>

            {/* Trending Videos */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">🔥 Трендовые видео</h2>
                <Button variant="outline" className="font-medium hover:scale-105 transition-transform">
                  Смотреть все
                  <Icon name="ArrowRight" size={16} className="ml-2" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {trendingVideos.map((video) => (
                  <Card key={video.id} className="video-card-hover cursor-pointer group">
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="relative overflow-hidden rounded-t-lg" onClick={() => setSelectedVideo(video)}>
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="w-16 h-16 video-gradient rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
                              <Icon name="Play" size={24} className="text-white ml-1" />
                            </div>
                          </div>
                          <Badge className="absolute top-3 left-3 bg-video-pink text-white border-0 font-semibold">
                            {video.platform}
                          </Badge>
                          <Badge className="absolute top-3 right-3 bg-black/70 text-white border-0">
                            {video.duration}
                          </Badge>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl w-full">
                        <DialogHeader>
                          <DialogTitle className="text-left">{selectedVideo?.title}</DialogTitle>
                        </DialogHeader>
                        <div className="relative">
                          <div className="aspect-video w-full">
                            <iframe
                              src={selectedVideo?.videoUrl}
                              className="w-full h-full rounded-lg"
                              allowFullScreen
                              title={selectedVideo?.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            ></iframe>
                          </div>
                          <Button
                            onClick={toggleFullscreen}
                            className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70 p-2 rounded-lg backdrop-blur-sm"
                            size="sm"
                          >
                            <Icon name={isFullscreen ? "Minimize2" : "Maximize2"} size={16} />
                          </Button>
                          {isSecureMode && (
                            <div className="absolute bottom-2 left-2 bg-video-pink/90 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                              🔒 Защищённый просмотр
                            </div>
                          )}
                        </div>
                        <div className="flex items-center justify-between pt-4">
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={selectedVideo?.avatar} />
                              <AvatarFallback>{selectedVideo?.author?.[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold text-lg">{selectedVideo?.author}</p>
                              <p className="text-sm text-gray-500">{selectedVideo?.views} просмотров</p>
                            </div>
                          </div>
                          <div className="flex space-x-3">
                            <Button
                              onClick={() => selectedVideo && toggleLike(selectedVideo.id)}
                              variant={likedVideos.has(selectedVideo?.id) ? "default" : "outline"}
                              size="lg"
                              className={`transition-all hover:scale-105 ${
                                likedVideos.has(selectedVideo?.id) ? "video-gradient text-white" : ""
                              }`}
                            >
                              <Icon name="Heart" size={18} className="mr-2" />
                              {selectedVideo?.likes}
                            </Button>
                            <Button variant="outline" size="lg" className="transition-all hover:scale-105">
                              <Icon name="Share2" size={18} className="mr-2" />
                              Поделиться
                            </Button>
                            <Button variant="outline" size="lg" className="transition-all hover:scale-105">
                              <Icon name="Bookmark" size={18} />
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-video-pink transition-colors">
                        {video.title}
                      </h3>
                      <div className="flex items-center space-x-3 mb-3">
                        <Avatar className="w-8 h-8 cursor-pointer hover:ring-2 hover:ring-video-pink/30 transition-all">
                          <AvatarImage src={video.avatar} />
                          <AvatarFallback>{video.author[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-gray-700 hover:text-video-pink cursor-pointer transition-colors">{video.author}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <Icon name="Eye" size={14} className="mr-1" />
                            {video.views}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleLike(video.id);
                            }}
                            className={`flex items-center transition-all hover:scale-110 transform duration-200 ${
                              likedVideos.has(video.id) ? 'text-video-pink' : 'text-gray-500 hover:text-video-pink'
                            }`}
                          >
                            <Icon name="Heart" size={14} className={`mr-1 ${likedVideos.has(video.id) ? 'fill-current' : ''}`} />
                            {video.likes}
                          </button>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="ghost" className="text-gray-500 hover:text-video-pink transition-all hover:scale-110">
                            <Icon name="Share2" size={14} />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-gray-500 hover:text-video-blue transition-all hover:scale-110">
                            <Icon name="Bookmark" size={14} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Upload Section */}
            <Card className="p-8 border-2 border-dashed border-gray-300 bg-gray-50/50 hover:border-video-pink hover:bg-video-pink/5 transition-all group">
              <div className="text-center">
                <div className="w-16 h-16 video-gradient rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Icon name="Upload" size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-video-pink transition-colors">
                  🔒 Защищённая загрузка видео
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Загружайте контент с автоматическим шифрованием. Ваши видео защищены уникальными кодами безопасности
                </p>
                
                {isUploading && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Загрузка и шифрование...</span>
                      <span className="text-sm font-medium text-video-pink">{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="w-full" />
                    {securityCode && (
                      <Alert className="mt-4 border-video-pink bg-video-pink/5">
                        <Icon name="Shield" size={16} />
                        <AlertDescription>
                          <strong>Код безопасности:</strong> {securityCode}
                          <br />
                          <span className="text-xs text-gray-600">Сохраните этот код для доступа к вашему видео</span>
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}
                
                <div className="flex justify-center space-x-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="video-gradient text-white font-semibold px-8 py-3 rounded-full hover:scale-105 transition-transform disabled:opacity-50"
                  >
                    <Icon name={isUploading ? "Loader2" : "Upload"} size={18} className={`mr-2 ${isUploading ? 'animate-spin' : ''}`} />
                    {isUploading ? 'Загружается...' : 'Выбрать файл'}
                  </Button>
                  <Button variant="outline" className="font-medium px-8 py-3 rounded-full hover:scale-105 transition-transform">
                    <Icon name="Video" size={18} className="mr-2" />
                    Записать видео
                  </Button>
                </div>
                
                <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <Icon name="Shield" size={16} className="text-video-pink" />
                  <span>Все загруженные файлы автоматически шифруются</span>
                </div>
              </div>
            </Card>
            
            {/* Security Features */}
            <Card className="p-6 bg-gradient-to-r from-video-pink/5 to-video-blue/5 border border-video-pink/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Icon name="Shield" size={20} className="mr-2 text-video-pink" />
                  Система безопасности
                </h3>
                <Badge className="video-gradient text-white border-0">
                  Активна
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-video-pink/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Lock" size={16} className="text-video-pink" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Шифрование AES-256</h4>
                    <p className="text-sm text-gray-600">Военный уровень защиты всех видеофайлов</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-video-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Eye" size={16} className="text-video-blue" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Приватный просмотр</h4>
                    <p className="text-sm text-gray-600">Никто не может отследить ваши действия</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Code" size={16} className="text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Открытый код</h4>
                    <p className="text-sm text-gray-600">Прозрачность и проверяемость всех алгоритмов</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-white/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="Shield" size={16} className="text-green-600" />
                    <span className="text-sm font-medium text-gray-700">Защищённый режим</span>
                  </div>
                  <button
                    onClick={() => setIsSecureMode(!isSecureMode)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      isSecureMode ? 'bg-video-pink' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isSecureMode ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </Card>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 video-gradient rounded-lg flex items-center justify-center">
                  <Icon name="Play" size={16} className="text-white ml-0.5" />
                </div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-video-pink to-video-blue bg-clip-text text-transparent">
                  VideoHub
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                🔒 Защищённая платформа с шифрованием видео, открытым исходным кодом и полным контролем над вашим контентом.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Создателям</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-video-pink transition-colors cursor-pointer">Загрузить видео</a></li>
                <li><a href="#" className="hover:text-video-pink transition-colors cursor-pointer">Аналитика</a></li>
                <li><a href="#" className="hover:text-video-pink transition-colors cursor-pointer">Монетизация</a></li>
                <li><a href="#" className="hover:text-video-pink transition-colors cursor-pointer">Сообщество</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Зрителям</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-video-pink transition-colors cursor-pointer">Тренды</a></li>
                <li><a href="#" className="hover:text-video-pink transition-colors cursor-pointer">Подписки</a></li>
                <li><a href="#" className="hover:text-video-pink transition-colors cursor-pointer">Плейлисты</a></li>
                <li><a href="#" className="hover:text-video-pink transition-colors cursor-pointer">Рекомендации</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Безопасность</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-video-pink transition-colors cursor-pointer">Защита данных</a></li>
                <li><a href="#" className="hover:text-video-pink transition-colors cursor-pointer">Открытый код</a></li>
                <li><a href="#" className="hover:text-video-pink transition-colors cursor-pointer">Модерация</a></li>
                <li><a href="#" className="hover:text-video-pink transition-colors cursor-pointer">Поддержка</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              © 2024 VideoHub. Все права защищены.
            </p>
            <div className="flex space-x-6">
              <Button size="sm" variant="ghost" className="text-gray-500 hover:text-video-pink transition-all hover:scale-110">
                <Icon name="Twitter" size={16} />
              </Button>
              <Button size="sm" variant="ghost" className="text-gray-500 hover:text-video-pink transition-all hover:scale-110">
                <Icon name="Instagram" size={16} />
              </Button>
              <Button size="sm" variant="ghost" className="text-gray-500 hover:text-video-pink transition-all hover:scale-110">
                <Icon name="Youtube" size={16} />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;