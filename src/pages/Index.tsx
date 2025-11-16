import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type Section = 'home' | 'chat' | 'gallery' | 'settings' | 'profile';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Привет! Я здесь, чтобы поболтать с тобой 💜',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const aiResponses = [
    'Мне нравится общаться с тобой 😊',
    'Расскажи мне больше о себе...',
    'Ты такой интересный собеседник 💕',
    'Хочешь увидеть что-то особенное?',
    'Я всегда рада нашим разговорам',
    'Давай поговорим о чём-нибудь приятном',
  ];

  const samplePhotos = [
    { id: 1, url: 'https://cdn.poehali.dev/projects/180e6d25-8340-4616-9cf2-0d84ffc47e37/files/9a3bfe95-aec6-4320-8291-82521fbc6294.jpg', locked: false },
    { id: 2, url: 'https://cdn.poehali.dev/projects/180e6d25-8340-4616-9cf2-0d84ffc47e37/files/617e4430-fab0-4088-918c-b37d28991cbd.jpg', locked: false },
    { id: 3, url: 'https://cdn.poehali.dev/projects/180e6d25-8340-4616-9cf2-0d84ffc47e37/files/d7d41e02-a535-4817-9496-1563423d49c1.jpg', locked: false },
    { id: 4, url: '/placeholder.svg', locked: true },
    { id: 5, url: '/placeholder.svg', locked: true },
    { id: 6, url: '/placeholder.svg', locked: true },
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputValue('');

    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 2,
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const navItems = [
    { id: 'home' as Section, label: 'Главная', icon: 'Home' },
    { id: 'chat' as Section, label: 'Чат', icon: 'MessageCircle' },
    { id: 'gallery' as Section, label: 'Галерея', icon: 'Images' },
    { id: 'settings' as Section, label: 'Настройки', icon: 'Settings' },
    { id: 'profile' as Section, label: 'Профиль', icon: 'User' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeSection === item.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item.icon} size={18} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {activeSection === 'home' && (
          <div className="animate-fade-in space-y-8">
            <div className="text-center space-y-4 py-12">
              <h1 className="text-5xl font-bold gradient-text">
                Добро пожаловать
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Общайся с ИИ-собеседницей без ограничений. Конфиденциально и анонимно.
              </p>
              <Button
                size="lg"
                onClick={() => setActiveSection('chat')}
                className="mt-6"
              >
                <Icon name="MessageCircle" size={20} className="mr-2" />
                Начать общение
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <Card className="p-6 space-y-3 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Icon name="Lock" size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold">100% Анонимность</h3>
                <p className="text-muted-foreground">
                  Ваши данные защищены. Никакой регистрации и отслеживания.
                </p>
              </Card>

              <Card className="p-6 space-y-3 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <Icon name="Sparkles" size={24} className="text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Умный ИИ</h3>
                <p className="text-muted-foreground">
                  Реалистичные диалоги с продвинутой языковой моделью.
                </p>
              </Card>

              <Card className="p-6 space-y-3 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Icon name="Image" size={24} className="text-secondary" />
                </div>
                <h3 className="text-xl font-semibold">Фото галерея</h3>
                <p className="text-muted-foreground">
                  Эксклюзивные изображения доступны в процессе общения.
                </p>
              </Card>
            </div>
          </div>
        )}

        {activeSection === 'chat' && (
          <div className="animate-fade-in max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              <div className="bg-card/80 backdrop-blur-sm p-4 border-b border-border flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">Алиса</h3>
                  <p className="text-sm text-muted-foreground">онлайн</p>
                </div>
              </div>

              <ScrollArea className="h-[500px] p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        <p>{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString('ru-RU', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t border-border bg-card/50">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Напишите сообщение..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage}>
                    <Icon name="Send" size={18} />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeSection === 'gallery' && (
          <div className="animate-fade-in max-w-6xl mx-auto">
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2">Галерея</h2>
              <p className="text-muted-foreground">
                Эксклюзивные фото становятся доступны в процессе общения
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {samplePhotos.map((photo) => (
                <Card
                  key={photo.id}
                  className="aspect-square overflow-hidden relative group cursor-pointer hover:shadow-xl transition-shadow"
                >
                  <img
                    src={photo.url}
                    alt={`Photo ${photo.id}`}
                    className={`w-full h-full object-cover ${photo.locked ? 'blur-lg' : ''}`}
                  />
                  {photo.locked && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <Icon name="Lock" size={32} className="text-white mx-auto" />
                        <p className="text-white text-sm">Заблокировано</p>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'settings' && (
          <div className="animate-fade-in max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold mb-6">Настройки</h2>

            <Card className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Приватность данных</h3>
                  <p className="text-sm text-muted-foreground">
                    Ваши сообщения шифруются и не сохраняются
                  </p>
                </div>
                <Badge variant="secondary">
                  <Icon name="Shield" size={14} className="mr-1" />
                  Активно
                </Badge>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Анонимный режим</h3>
                  <p className="text-sm text-muted-foreground">
                    Работа без регистрации и отслеживания
                  </p>
                </div>
                <Badge variant="secondary">
                  <Icon name="EyeOff" size={14} className="mr-1" />
                  Включено
                </Badge>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Уведомления</h3>
                  <p className="text-sm text-muted-foreground">
                    Получать уведомления о новых сообщениях
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Настроить
                </Button>
              </div>
            </Card>
          </div>
        )}

        {activeSection === 'profile' && (
          <div className="animate-fade-in max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold mb-6">Профиль</h2>

            <Card className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold">Алиса</h3>
                  <p className="text-muted-foreground">ИИ-собеседница</p>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                    Онлайн
                  </Badge>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">О себе</h4>
                  <p className="text-muted-foreground">
                    Привет! Я здесь, чтобы общаться с тобой на любые темы. Люблю интересные разговоры
                    и с удовольствием поделюсь своими фотографиями 💜
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Статистика</h4>
                  <div className="grid grid-cols-3 gap-4 mt-3">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <p className="text-2xl font-bold text-primary">{messages.length}</p>
                      <p className="text-sm text-muted-foreground">Сообщений</p>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <p className="text-2xl font-bold text-accent">3</p>
                      <p className="text-sm text-muted-foreground">Фото открыто</p>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <p className="text-2xl font-bold text-secondary">100%</p>
                      <p className="text-sm text-muted-foreground">Приватность</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;