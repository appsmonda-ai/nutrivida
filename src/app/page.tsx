"use client";

import { useState } from "react";
import { Leaf, UtensilsCrossed, Camera, DollarSign, Dumbbell, Menu, X, TrendingUp, Target, Award, ChevronRight, Clock, Flame, Info, Sparkles, Heart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type View = "landing" | "dashboard" | "meal-quiz" | "workout-quiz" | "calories" | "meal-plan" | "workout-plan";

interface Exercise {
  nome: string;
  descricao: string;
  series: string;
  tempo: string;
  instrucoes?: string;
}

interface SignupData {
  nome: string;
  email: string;
  telefone: string;
  idade: string;
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<View>("landing");
  const [signupDialogOpen, setSignupDialogOpen] = useState(false);
  const [signupData, setSignupData] = useState<SignupData>({
    nome: "",
    email: "",
    telefone: "",
    idade: ""
  });
  
  // Meal Quiz State
  const [mealQuizStep, setMealQuizStep] = useState(1);
  const [mealQuizData, setMealQuizData] = useState({
    objetivo: "",
    pesoAtual: "",
    pesoDesejado: "",
    altura: "",
    atividadeFisica: "",
    preferenciaAlimentar: "",
    preferenciaOutro: "",
    restricaoAlimentar: [] as string[],
    restricaoOutra: "",
    estiloCardapio: "",
    refeicoesdia: "",
    lanches: "",
    alimentosNaoGosta: "",
    orcamento: "",
    sobremesas: ""
  });

  // Workout Quiz State
  const [workoutQuizStep, setWorkoutQuizStep] = useState(1);
  const [workoutQuizData, setWorkoutQuizData] = useState({
    objetivo: "",
    nivel: "",
    tipoTreino: [] as string[],
    tipoTreinoOutro: "",
    diasSemana: "",
    tempoDia: "",
    equipamento: [] as string[],
    equipamentoOutro: "",
    limitacao: [] as string[],
    limitacaoOutra: "",
    intensidade: "",
    ritmo: "",
    horario: "",
    metas: [] as string[],
    motivacao: ""
  });

  // Generated Plans State
  const [generatedMealPlan, setGeneratedMealPlan] = useState<any>(null);
  const [generatedWorkoutPlan, setGeneratedWorkoutPlan] = useState<any>(null);

  // Calories State
  const [plateDescription, setPlateDescription] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [caloriesResult, setCaloriesResult] = useState<any>(null);

  // Exercise Dialog State
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [exerciseDialogOpen, setExerciseDialogOpen] = useState(false);

  const handleOpenSignup = () => {
    setSignupDialogOpen(true);
  };

  const handleSignupSubmit = () => {
    // Aqui você pode adicionar lógica para salvar os dados
    console.log("Dados do cadastro:", signupData);
    setSignupDialogOpen(false);
    setCurrentView("dashboard");
  };

  const handleStartDashboard = () => {
    setCurrentView("dashboard");
  };

  const handleStartMealQuiz = () => {
    setCurrentView("meal-quiz");
    setMealQuizStep(1);
  };

  const handleStartWorkoutQuiz = () => {
    setCurrentView("workout-quiz");
    setWorkoutQuizStep(1);
  };

  const handleOpenCalories = () => {
    setCurrentView("calories");
  };

  const handleBackToLanding = () => {
    setCurrentView("landing");
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
  };

  // Meal Quiz Navigation
  const handleMealQuizNext = () => {
    if (mealQuizStep < 7) {
      setMealQuizStep(mealQuizStep + 1);
    } else {
      generateMealPlan();
    }
  };

  const handleMealQuizPrev = () => {
    if (mealQuizStep > 1) {
      setMealQuizStep(mealQuizStep - 1);
    }
  };

  // Workout Quiz Navigation
  const handleWorkoutQuizNext = () => {
    if (workoutQuizStep < 7) {
      setWorkoutQuizStep(workoutQuizStep + 1);
    } else {
      generateWorkoutPlan();
    }
  };

  const handleWorkoutQuizPrev = () => {
    if (workoutQuizStep > 1) {
      setWorkoutQuizStep(workoutQuizStep - 1);
    }
  };

  // Generate Meal Plan based on quiz data
  const generateMealPlan = () => {
    const plan = {
      objetivo: mealQuizData.objetivo,
      caloriasdiarias: mealQuizData.objetivo === "emagrecer" ? 1800 : mealQuizData.objetivo === "ganhar-massa" ? 2500 : 2200,
      semana: [
        {
          dia: "Segunda-feira",
          refeicoes: [
            { nome: "Café da manhã", horario: "07:00", itens: ["2 fatias de pão integral", "2 ovos mexidos", "1 banana", "Café com leite"], calorias: 380 },
            { nome: "Lanche da manhã", horario: "10:00", itens: ["1 iogurte natural", "1 colher de granola"], calorias: 150 },
            { nome: "Almoço", horario: "12:30", itens: ["Arroz integral (150g)", "Feijão preto (100g)", "Frango grelhado (120g)", "Salada verde"], calorias: 520 },
            { nome: "Lanche da tarde", horario: "16:00", itens: ["1 maçã", "10 castanhas"], calorias: 180 },
            { nome: "Jantar", horario: "19:30", itens: ["Batata doce (150g)", "Peixe grelhado (150g)", "Brócolis no vapor"], calorias: 450 }
          ]
        },
        {
          dia: "Terça-feira",
          refeicoes: [
            { nome: "Café da manhã", horario: "07:00", itens: ["Tapioca com queijo", "Suco de laranja natural", "1 fatia de mamão"], calorias: 350 },
            { nome: "Lanche da manhã", horario: "10:00", itens: ["Mix de frutas"], calorias: 120 },
            { nome: "Almoço", horario: "12:30", itens: ["Macarrão integral (150g)", "Molho de tomate caseiro", "Carne moída magra (100g)", "Salada de rúcula"], calorias: 550 },
            { nome: "Lanche da tarde", horario: "16:00", itens: ["Vitamina de banana com aveia"], calorias: 200 },
            { nome: "Jantar", horario: "19:30", itens: ["Omelete de 3 ovos", "Salada de tomate e pepino", "2 fatias de pão integral"], calorias: 420 }
          ]
        },
        {
          dia: "Quarta-feira",
          refeicoes: [
            { nome: "Café da manhã", horario: "07:00", itens: ["Mingau de aveia", "1 banana picada", "Canela"], calorias: 320 },
            { nome: "Lanche da manhã", horario: "10:00", itens: ["Barra de cereal integral"], calorias: 130 },
            { nome: "Almoço", horario: "12:30", itens: ["Arroz integral (150g)", "Lentilha (100g)", "Bife de frango (120g)", "Cenoura cozida"], calorias: 530 },
            { nome: "Lanche da tarde", horario: "16:00", itens: ["Iogurte grego", "Mel"], calorias: 170 },
            { nome: "Jantar", horario: "19:30", itens: ["Sopa de legumes", "Peito de frango desfiado (100g)", "2 torradas integrais"], calorias: 400 }
          ]
        },
        {
          dia: "Quinta-feira",
          refeicoes: [
            { nome: "Café da manhã", horario: "07:00", itens: ["Panqueca de banana com aveia", "Café com leite"], calorias: 360 },
            { nome: "Lanche da manhã", horario: "10:00", itens: ["1 pera", "Amêndoas (10 unidades)"], calorias: 160 },
            { nome: "Almoço", horario: "12:30", itens: ["Quinoa (150g)", "Feijão carioca (100g)", "Carne magra (120g)", "Abobrinha grelhada"], calorias: 560 },
            { nome: "Lanche da tarde", horario: "16:00", itens: ["Smoothie de frutas vermelhas"], calorias: 190 },
            { nome: "Jantar", horario: "19:30", itens: ["Purê de batata doce", "Salmão grelhado (150g)", "Aspargos"], calorias: 480 }
          ]
        },
        {
          dia: "Sexta-feira",
          refeicoes: [
            { nome: "Café da manhã", horario: "07:00", itens: ["Pão francês integral (2 unidades)", "Requeijão light", "Suco verde"], calorias: 340 },
            { nome: "Lanche da manhã", horario: "10:00", itens: ["Iogurte com chia"], calorias: 140 },
            { nome: "Almoço", horario: "12:30", itens: ["Arroz integral (150g)", "Feijão preto (100g)", "Tilápia grelhada (150g)", "Salada mista"], calorias: 540 },
            { nome: "Lanche da tarde", horario: "16:00", itens: ["Abacate com mel"], calorias: 210 },
            { nome: "Jantar", horario: "19:30", itens: ["Wrap integral com frango", "Salada de folhas verdes"], calorias: 430 }
          ]
        }
      ],
      listaCompras: [
        "Pão integral",
        "Ovos (2 dúzias)",
        "Bananas",
        "Arroz integral (1kg)",
        "Feijão preto (500g)",
        "Frango (1kg)",
        "Peixe/Tilápia (500g)",
        "Batata doce (1kg)",
        "Frutas variadas",
        "Verduras e legumes",
        "Iogurte natural",
        "Granola",
        "Castanhas/Amêndoas",
        "Aveia",
        "Tapioca"
      ]
    };
    
    setGeneratedMealPlan(plan);
    setCurrentView("meal-plan");
  };

  // Generate Workout Plan based on quiz data
  const generateWorkoutPlan = () => {
    const plan = {
      objetivo: workoutQuizData.objetivo,
      nivel: workoutQuizData.nivel,
      diasSemana: parseInt(workoutQuizData.diasSemana) || 3,
      semana: [
        {
          dia: "Segunda-feira",
          tipo: "Treino Funcional",
          duracao: workoutQuizData.tempoDia || "30-45 min",
          intensidade: workoutQuizData.intensidade || "moderada",
          exercicios: [
            { 
              nome: "Aquecimento", 
              descricao: "5 min de polichinelos e alongamento dinâmico", 
              series: "1x", 
              tempo: "5 min",
              instrucoes: "Comece com movimentos leves para aumentar a temperatura corporal. Faça polichinelos em ritmo moderado, alternando com rotações de braços e pernas. Isso prepara músculos e articulações para o treino."
            },
            { 
              nome: "Agachamento", 
              descricao: "Agachamento livre ou com peso", 
              series: "3x15", 
              tempo: "3 min",
              instrucoes: "Fique em pé com os pés na largura dos ombros. Desça flexionando os joelhos como se fosse sentar em uma cadeira, mantendo as costas retas. Desça até as coxas ficarem paralelas ao chão e volte à posição inicial. Mantenha o peso nos calcanhares."
            },
            { 
              nome: "Flexão de braço", 
              descricao: "Flexão tradicional ou apoiada nos joelhos", 
              series: "3x12", 
              tempo: "3 min",
              instrucoes: "Posicione as mãos no chão na largura dos ombros. Mantenha o corpo reto como uma prancha. Desça o corpo flexionando os cotovelos até o peito quase tocar o chão, depois empurre para cima. Iniciantes podem apoiar os joelhos no chão."
            },
            { 
              nome: "Prancha", 
              descricao: "Prancha isométrica", 
              series: "3x30s", 
              tempo: "2 min",
              instrucoes: "Apoie os antebraços e pontas dos pés no chão. Mantenha o corpo reto, contraindo abdômen e glúteos. Não deixe o quadril cair ou subir demais. Mantenha a posição respirando normalmente."
            },
            { 
              nome: "Afundo", 
              descricao: "Afundo alternado", 
              series: "3x12", 
              tempo: "3 min",
              instrucoes: "Dê um passo largo à frente. Desça o corpo flexionando ambos os joelhos até formarem ângulos de 90 graus. O joelho de trás deve quase tocar o chão. Volte à posição inicial e alterne as pernas."
            },
            { 
              nome: "Burpee", 
              descricao: "Burpee completo", 
              series: "3x10", 
              tempo: "4 min",
              instrucoes: "Comece em pé. Agache e apoie as mãos no chão. Jogue as pernas para trás ficando em posição de flexão. Faça uma flexão (opcional). Traga as pernas de volta e salte para cima com os braços estendidos. Movimento completo e dinâmico."
            },
            { 
              nome: "Alongamento", 
              descricao: "Alongamento de todos os grupos musculares", 
              series: "1x", 
              tempo: "5 min",
              instrucoes: "Alongue cada grupo muscular por 20-30 segundos sem forçar. Foque em pernas, costas, braços e pescoço. Respire profundamente durante os alongamentos. Isso ajuda na recuperação e previne lesões."
            }
          ]
        },
        {
          dia: "Quarta-feira",
          tipo: "Corrida/Caminhada",
          duracao: workoutQuizData.tempoDia || "30-45 min",
          intensidade: workoutQuizData.intensidade || "moderada",
          exercicios: [
            { 
              nome: "Aquecimento", 
              descricao: "Caminhada leve", 
              series: "1x", 
              tempo: "5 min",
              instrucoes: "Comece com uma caminhada leve para preparar o corpo. Movimente os braços naturalmente e mantenha uma postura ereta. Aumente gradualmente o ritmo nos últimos 2 minutos."
            },
            { 
              nome: "Corrida/Caminhada", 
              descricao: "Ritmo moderado constante", 
              series: "1x", 
              tempo: "25 min",
              instrucoes: "Mantenha um ritmo confortável onde você consiga conversar. Se iniciante, alterne 2 minutos de corrida leve com 1 minuto de caminhada. Mantenha os ombros relaxados e braços em movimento natural."
            },
            { 
              nome: "Desaceleração", 
              descricao: "Caminhada leve", 
              series: "1x", 
              tempo: "5 min",
              instrucoes: "Reduza gradualmente o ritmo até uma caminhada leve. Isso ajuda o corpo a se recuperar e normalizar os batimentos cardíacos. Respire profundamente."
            },
            { 
              nome: "Alongamento", 
              descricao: "Foco em pernas e quadril", 
              series: "1x", 
              tempo: "5 min",
              instrucoes: "Alongue panturrilhas, coxas (frente e trás), quadril e glúteos. Segure cada alongamento por 20-30 segundos. Não force, apenas sinta um leve desconforto. Respire normalmente."
            }
          ]
        },
        {
          dia: "Sexta-feira",
          tipo: "Dança/Cardio",
          duracao: workoutQuizData.tempoDia || "30-45 min",
          intensidade: workoutQuizData.intensidade || "moderada",
          exercicios: [
            { 
              nome: "Aquecimento", 
              descricao: "Movimentos leves de dança", 
              series: "1x", 
              tempo: "5 min",
              instrucoes: "Comece com movimentos suaves ao ritmo da música. Movimente braços, quadril e pernas de forma leve. Aumente gradualmente a intensidade para preparar o corpo."
            },
            { 
              nome: "Zumba/Fitdance", 
              descricao: "Coreografias animadas", 
              series: "1x", 
              tempo: "30 min",
              instrucoes: "Siga as coreografias com energia! Não se preocupe em acertar todos os passos, o importante é se movimentar. Mantenha o abdômen contraído e joelhos levemente flexionados. Divirta-se!"
            },
            { 
              nome: "Desaceleração", 
              descricao: "Movimentos lentos", 
              series: "1x", 
              tempo: "5 min",
              instrucoes: "Reduza gradualmente a intensidade dos movimentos. Dance em ritmo mais lento, respirando profundamente. Deixe o corpo relaxar aos poucos."
            },
            { 
              nome: "Alongamento", 
              descricao: "Alongamento completo", 
              series: "1x", 
              tempo: "5 min",
              instrucoes: "Alongue todo o corpo, especialmente pernas, quadril e costas. Mantenha cada posição por 20-30 segundos. Respire profundamente e relaxe."
            }
          ]
        }
      ],
      dicas: [
        "Mantenha-se hidratado durante os treinos",
        "Respeite seus limites e evolua gradualmente",
        "Use roupas confortáveis e tênis adequado",
        "Faça os exercícios com boa postura",
        "Descanse adequadamente entre os treinos"
      ],
      metas: {
        semanal: `Treinar ${workoutQuizData.diasSemana || 3} dias na semana`,
        mensal: "Aumentar resistência e força progressivamente",
        trimestral: `${workoutQuizData.objetivo === "emagrecer" ? "Perder gordura corporal" : workoutQuizData.objetivo === "ganhar-massa" ? "Ganhar massa muscular" : "Melhorar condicionamento geral"}`
      }
    };
    
    setGeneratedWorkoutPlan(plan);
    setCurrentView("workout-plan");
  };

  const handleAnalyzeCalories = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setCaloriesResult({
        calorias: 450,
        proteinas: 35,
        carboidratos: 42,
        gorduras: 15,
        fibras: 8
      });
      setAnalyzing(false);
    }, 2000);
  };

  const handleExerciseClick = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setExerciseDialogOpen(true);
  };

  // Landing Page
  if (currentView === "landing") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-green-100 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
                  <Leaf className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">NutriVida</h1>
                  <p className="text-xs text-gray-600 font-medium">Transforme sua vida hoje</p>
                </div>
              </div>

              <nav className="hidden md:flex items-center gap-6">
                <a href="#inicio" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
                  Início
                </a>
                <a href="#funcionalidades" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
                  Funcionalidades
                </a>
                <a href="#depoimentos" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
                  Depoimentos
                </a>
                <Button 
                  onClick={handleOpenSignup}
                  className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Clique aqui para mudar sua saúde
                </Button>
              </nav>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-700 hover:bg-green-50 rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {mobileMenuOpen && (
              <nav className="md:hidden mt-4 pb-4 flex flex-col gap-3 border-t border-green-100 pt-4">
                <a href="#inicio" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium py-2">
                  Início
                </a>
                <a href="#funcionalidades" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium py-2">
                  Funcionalidades
                </a>
                <a href="#depoimentos" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium py-2">
                  Depoimentos
                </a>
                <Button 
                  onClick={handleOpenSignup}
                  className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 text-white shadow-lg w-full font-semibold"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Clique aqui para mudar sua saúde
                </Button>
              </nav>
            )}
          </div>
        </header>

        <section id="inicio" className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 px-6 py-3 rounded-full mb-8 text-sm font-semibold shadow-md">
                <Sparkles className="w-5 h-5" />
                Mais de 10.000 vidas transformadas
              </div>
              <h2 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                  Transforme sua vida
                </span>
                <br />
                <span className="text-gray-900">em 30 dias</span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                Perca peso, ganhe energia e conquiste o corpo dos seus sonhos com nosso método exclusivo de alimentação e treinos personalizados
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg" 
                  onClick={handleOpenSignup}
                  className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 text-white shadow-2xl text-lg px-10 py-7 rounded-2xl transform hover:scale-105 transition-all duration-300 font-bold"
                >
                  <Zap className="w-6 h-6 mr-2" />
                  Clique aqui para mudar sua saúde
                  <ChevronRight className="w-6 h-6 ml-2" />
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-6 flex items-center justify-center gap-2">
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                Sem compromisso • Resultados garantidos
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-16">
              <Card className="border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Resultados Reais</h3>
                  <p className="text-gray-600">Perca até 5kg no primeiro mês com nosso método comprovado</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">100% Personalizado</h3>
                  <p className="text-gray-600">Planos feitos especialmente para você e seus objetivos</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Rápido e Fácil</h3>
                  <p className="text-gray-600">Comece em menos de 5 minutos, sem complicação</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="funcionalidades" className="container mx-auto px-4 py-16 md:py-24 bg-gradient-to-br from-white to-emerald-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                Tudo que você precisa para <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">ter sucesso</span>
              </h3>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Ferramentas completas e inteligentes para transformar sua rotina
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
                <CardHeader>
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                    <UtensilsCrossed className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-900 font-bold">Cardápios Personalizados</CardTitle>
                  <CardDescription className="text-gray-600 text-base">
                    Receba um plano alimentar completo adaptado aos seus objetivos e preferências
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 border-green-200 hover:border-green-400 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
                <CardHeader>
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                    <Camera className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-900 font-bold">Contador de Calorias</CardTitle>
                  <CardDescription className="text-gray-600 text-base">
                    Descubra instantaneamente as calorias de qualquer refeição
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 border-teal-200 hover:border-teal-400 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
                <CardHeader>
                  <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                    <DollarSign className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-900 font-bold">Modo Economia</CardTitle>
                  <CardDescription className="text-gray-600 text-base">
                    Economize até 40% com receitas inteligentes e acessíveis
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 border-blue-200 hover:border-blue-400 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
                <CardHeader>
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                    <Dumbbell className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-900 font-bold">Treinos em Casa</CardTitle>
                  <CardDescription className="text-gray-600 text-base">
                    Exercícios eficazes sem precisar de academia ou equipamentos
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 border-purple-200 hover:border-purple-400 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
                <CardHeader>
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                    <Heart className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-900 font-bold">Acompanhamento Diário</CardTitle>
                  <CardDescription className="text-gray-600 text-base">
                    Monitore seu progresso e mantenha-se motivado todos os dias
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 border-orange-200 hover:border-orange-400 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
                <CardHeader>
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                    <Sparkles className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-900 font-bold">Receitas Brasileiras</CardTitle>
                  <CardDescription className="text-gray-600 text-base">
                    Sabores que você ama, adaptados para sua saúde
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        <section id="depoimentos" className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                Veja quem já <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">transformou sua vida</span>
              </h3>
              <p className="text-xl text-gray-600">Histórias reais de pessoas reais</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-2 border-green-200 bg-white hover:shadow-2xl transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Heart key={i} className="w-5 h-5 text-red-500 fill-red-500" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"Perdi 8kg em 2 meses e me sinto incrível! O app é super fácil de usar e os cardápios são deliciosos."</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-400 rounded-full flex items-center justify-center text-white font-bold">
                      M
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Maria Silva</p>
                      <p className="text-sm text-gray-600">São Paulo, SP</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-200 bg-white hover:shadow-2xl transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Heart key={i} className="w-5 h-5 text-red-500 fill-red-500" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"Finalmente consegui ganhar massa muscular! Os treinos são práticos e os resultados apareceram rápido."</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full flex items-center justify-center text-white font-bold">
                      J
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">João Santos</p>
                      <p className="text-sm text-gray-600">Rio de Janeiro, RJ</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200 bg-white hover:shadow-2xl transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Heart key={i} className="w-5 h-5 text-red-500 fill-red-500" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"Mudou minha relação com a comida. Aprendi a comer bem sem gastar muito. Recomendo demais!"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                      A
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Ana Costa</p>
                      <p className="text-sm text-gray-600">Belo Horizonte, MG</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 rounded-3xl p-10 md:p-16 text-center shadow-2xl transform hover:scale-105 transition-all duration-300">
            <Sparkles className="w-16 h-16 text-white mx-auto mb-6" />
            <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
              Sua transformação começa agora!
            </h3>
            <p className="text-xl text-emerald-50 mb-10 max-w-2xl mx-auto leading-relaxed">
              Junte-se a milhares de pessoas que já estão vivendo com mais saúde, energia e autoestima
            </p>
            <Button 
              size="lg" 
              onClick={handleOpenSignup}
              className="bg-white text-emerald-600 hover:bg-gray-100 shadow-2xl text-xl px-12 py-8 rounded-2xl transform hover:scale-105 transition-all duration-300 font-bold"
            >
              <Zap className="w-6 h-6 mr-2" />
              Clique aqui para mudar sua saúde
              <ChevronRight className="w-6 h-6 ml-2" />
            </Button>
            <p className="text-sm text-emerald-50 mt-6 flex items-center justify-center gap-2">
              <Heart className="w-4 h-4 text-white fill-white" />
              Comece grátis • Sem cartão de crédito
            </p>
          </div>
        </section>

        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-bold text-xl">NutriVida</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Transformando vidas através da alimentação saudável e exercícios
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Funcionalidades</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>Planejador de Refeições</li>
                  <li>Controle de Calorias</li>
                  <li>Modo Economia</li>
                  <li>Treinos Personalizados</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Empresa</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>Sobre Nós</li>
                  <li>Blog</li>
                  <li>Contato</li>
                  <li>Carreiras</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>Privacidade</li>
                  <li>Termos de Uso</li>
                  <li>Cookies</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
              <p>© 2024 NutriVida. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>

        {/* Signup Dialog */}
        <Dialog open={signupDialogOpen} onOpenChange={setSignupDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">
                <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  Comece sua transformação!
                </span>
              </DialogTitle>
              <DialogDescription className="text-center text-base">
                Preencha seus dados e receba seu plano personalizado
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="nome" className="text-base font-semibold">Nome completo</Label>
                <Input 
                  id="nome" 
                  placeholder="Digite seu nome"
                  value={signupData.nome}
                  onChange={(e) => setSignupData({...signupData, nome: e.target.value})}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-base font-semibold">E-mail</Label>
                <Input 
                  id="email" 
                  type="email"
                  placeholder="seu@email.com"
                  value={signupData.email}
                  onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="telefone" className="text-base font-semibold">Telefone</Label>
                <Input 
                  id="telefone" 
                  type="tel"
                  placeholder="(00) 00000-0000"
                  value={signupData.telefone}
                  onChange={(e) => setSignupData({...signupData, telefone: e.target.value})}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="idade" className="text-base font-semibold">Idade</Label>
                <Input 
                  id="idade" 
                  type="number"
                  placeholder="Ex: 25"
                  value={signupData.idade}
                  onChange={(e) => setSignupData({...signupData, idade: e.target.value})}
                  className="mt-2"
                />
              </div>
              <Button 
                onClick={handleSignupSubmit}
                disabled={!signupData.nome || !signupData.email || !signupData.telefone || !signupData.idade}
                className="w-full bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 text-white shadow-lg py-6 text-lg font-bold"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Começar Agora
              </Button>
              <p className="text-xs text-gray-500 text-center">
                Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Dashboard View
  if (currentView === "dashboard") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">NutriVida</h1>
                  <p className="text-xs text-gray-600">Sua Jornada de Saúde</p>
                </div>
              </div>
              <Button variant="outline" onClick={handleBackToLanding}>
                Voltar
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Bem-vindo à sua jornada! 🎉
              </h2>
              <p className="text-lg text-gray-600">
                Acompanhe seu progresso e alcance seus objetivos
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Peso Atual</CardTitle>
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-gray-900">
                    {mealQuizData.pesoAtual ? `${mealQuizData.pesoAtual} kg` : "-- kg"}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {mealQuizData.pesoAtual ? "Acompanhe sua evolução" : "Complete o quiz para começar"}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Meta</CardTitle>
                    <Target className="w-5 h-5 text-blue-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-gray-900">
                    {mealQuizData.pesoDesejado ? `${mealQuizData.pesoDesejado} kg` : "-- kg"}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {mealQuizData.pesoDesejado ? "Continue firme!" : "Defina sua meta no quiz"}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Treinos</CardTitle>
                    <Award className="w-5 h-5 text-purple-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-gray-900">0/7</p>
                  <p className="text-sm text-gray-600 mt-1">Dias treinados esta semana</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="cardapios" className="w-full">
              <TabsList className="grid w-full grid-cols-3 gap-2 bg-gray-100 p-2 rounded-xl mb-6">
                <TabsTrigger value="cardapios" className="data-[state=active]:bg-white data-[state=active]:text-green-600 rounded-lg">
                  Cardápios
                </TabsTrigger>
                <TabsTrigger value="treinos" className="data-[state=active]:bg-white data-[state=active]:text-green-600 rounded-lg">
                  Treinos
                </TabsTrigger>
                <TabsTrigger value="calorias" className="data-[state=active]:bg-white data-[state=active]:text-green-600 rounded-lg">
                  Calorias
                </TabsTrigger>
              </TabsList>

              <TabsContent value="cardapios">
                <Card className="border-2 border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-2xl">Planejador de Refeições</CardTitle>
                    <CardDescription>
                      {generatedMealPlan ? "Seu cardápio personalizado está pronto!" : "Responda o quiz para receber seu cardápio personalizado"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {generatedMealPlan ? (
                      <div className="space-y-4">
                        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                          <h4 className="font-semibold text-gray-900 mb-2">✅ Cardápio gerado com sucesso!</h4>
                          <p className="text-gray-700 text-sm mb-4">
                            Seu plano alimentar personalizado está pronto com {generatedMealPlan.semana.length} dias de refeições.
                          </p>
                          <Button 
                            onClick={() => setCurrentView("meal-plan")}
                            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                          >
                            Ver Meu Cardápio Completo
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2">O que você vai receber:</h4>
                          <ul className="space-y-2 text-gray-700 text-sm">
                            <li>✓ Cardápio semanal completo</li>
                            <li>✓ Receitas adaptadas ao seu objetivo</li>
                            <li>✓ Lista de compras organizada</li>
                            <li>✓ Opções econômicas disponíveis</li>
                          </ul>
                        </div>
                        <Button 
                          onClick={handleStartMealQuiz}
                          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                        >
                          Começar Quiz de Cardápios
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="treinos">
                <Card className="border-2 border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-2xl">Treinos Personalizados</CardTitle>
                    <CardDescription>
                      {generatedWorkoutPlan ? "Seu plano de treinos está pronto!" : "Responda o quiz para receber seu plano de treinos"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {generatedWorkoutPlan ? (
                      <div className="space-y-4">
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                          <h4 className="font-semibold text-gray-900 mb-2">✅ Plano de treinos gerado com sucesso!</h4>
                          <p className="text-gray-700 text-sm mb-4">
                            Seu plano de treinos personalizado está pronto com {generatedWorkoutPlan.semana.length} dias de exercícios.
                          </p>
                          <Button 
                            onClick={() => setCurrentView("workout-plan")}
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                          >
                            Ver Meu Plano de Treinos Completo
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2">O que você vai receber:</h4>
                          <ul className="space-y-2 text-gray-700 text-sm">
                            <li>✓ Plano de treinos semanal</li>
                            <li>✓ Exercícios em casa, dança ou corrida</li>
                            <li>✓ Adaptado ao seu nível</li>
                            <li>✓ Metas e acompanhamento</li>
                          </ul>
                        </div>
                        <Button 
                          onClick={handleStartWorkoutQuiz}
                          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                        >
                          Começar Quiz de Treinos
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="calorias">
                <Card className="border-2 border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-2xl">Controle de Calorias</CardTitle>
                    <CardDescription>
                      Descreva seu prato e descubra as calorias
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      onClick={handleOpenCalories}
                      className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
                    >
                      Analisar Prato
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }

  // Meal Quiz View
  if (currentView === "meal-quiz") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <UtensilsCrossed className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Quiz de Cardápios</h1>
                  <p className="text-xs text-gray-600">Passo {mealQuizStep} de 7</p>
                </div>
              </div>
              <Button variant="outline" onClick={handleBackToDashboard}>
                Voltar
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(mealQuizStep / 7) * 100}%` }}
                />
              </div>
            </div>

            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="text-2xl">
                  {mealQuizStep === 1 && "Qual é o seu objetivo principal?"}
                  {mealQuizStep === 2 && "Informações básicas"}
                  {mealQuizStep === 3 && "Nível de atividade física"}
                  {mealQuizStep === 4 && "Preferências alimentares"}
                  {mealQuizStep === 5 && "Restrições alimentares"}
                  {mealQuizStep === 6 && "Estilo de cardápio"}
                  {mealQuizStep === 7 && "Últimas informações"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {mealQuizStep === 1 && (
                  <RadioGroup value={mealQuizData.objetivo} onValueChange={(value) => setMealQuizData({...mealQuizData, objetivo: value})}>
                    <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-green-500 cursor-pointer">
                      <RadioGroupItem value="emagrecer" id="emagrecer" />
                      <Label htmlFor="emagrecer" className="cursor-pointer flex-1">Emagrecer</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-green-500 cursor-pointer">
                      <RadioGroupItem value="ganhar-massa" id="ganhar-massa" />
                      <Label htmlFor="ganhar-massa" className="cursor-pointer flex-1">Ganhar massa muscular</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-green-500 cursor-pointer">
                      <RadioGroupItem value="manter" id="manter" />
                      <Label htmlFor="manter" className="cursor-pointer flex-1">Manter peso e ter alimentação saudável</Label>
                    </div>
                  </RadioGroup>
                )}

                {mealQuizStep === 2 && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="pesoAtual">Peso atual (kg)</Label>
                      <Input 
                        id="pesoAtual" 
                        type="number" 
                        placeholder="Ex: 70"
                        value={mealQuizData.pesoAtual}
                        onChange={(e) => setMealQuizData({...mealQuizData, pesoAtual: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="pesoDesejado">Peso desejado (kg)</Label>
                      <Input 
                        id="pesoDesejado" 
                        type="number" 
                        placeholder="Ex: 65"
                        value={mealQuizData.pesoDesejado}
                        onChange={(e) => setMealQuizData({...mealQuizData, pesoDesejado: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="altura">Altura (cm)</Label>
                      <Input 
                        id="altura" 
                        type="number" 
                        placeholder="Ex: 170"
                        value={mealQuizData.altura}
                        onChange={(e) => setMealQuizData({...mealQuizData, altura: e.target.value})}
                      />
                    </div>
                  </div>
                )}

                {mealQuizStep === 3 && (
                  <RadioGroup value={mealQuizData.atividadeFisica} onValueChange={(value) => setMealQuizData({...mealQuizData, atividadeFisica: value})}>
                    <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-green-500 cursor-pointer">
                      <RadioGroupItem value="sedentario" id="sedentario" />
                      <Label htmlFor="sedentario" className="cursor-pointer flex-1">Sedentário (pouco ou nenhum exercício)</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-green-500 cursor-pointer">
                      <RadioGroupItem value="leve" id="leve" />
                      <Label htmlFor="leve" className="cursor-pointer flex-1">Levemente ativo (1-3 dias/semana)</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-green-500 cursor-pointer">
                      <RadioGroupItem value="moderado" id="moderado" />
                      <Label htmlFor="moderado" className="cursor-pointer flex-1">Moderadamente ativo (3-5 dias/semana)</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-green-500 cursor-pointer">
                      <RadioGroupItem value="muito-ativo" id="muito-ativo" />
                      <Label htmlFor="muito-ativo" className="cursor-pointer flex-1">Muito ativo (6-7 dias/semana)</Label>
                    </div>
                  </RadioGroup>
                )}

                {mealQuizStep === 4 && (
                  <RadioGroup value={mealQuizData.preferenciaAlimentar} onValueChange={(value) => setMealQuizData({...mealQuizData, preferenciaAlimentar: value})}>
                    <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-green-500 cursor-pointer">
                      <RadioGroupItem value="onivoro" id="onivoro" />
                      <Label htmlFor="onivoro" className="cursor-pointer flex-1">Onívoro (como de tudo)</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-green-500 cursor-pointer">
                      <RadioGroupItem value="vegetariano" id="vegetariano" />
                      <Label htmlFor="vegetariano" className="cursor-pointer flex-1">Vegetariano</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-green-500 cursor-pointer">
                      <RadioGroupItem value="vegano" id="vegano" />
                      <Label htmlFor="vegano" className="cursor-pointer flex-1">Vegano</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-green-500 cursor-pointer">
                      <RadioGroupItem value="outro" id="outro-pref" />
                      <Label htmlFor="outro-pref" className="cursor-pointer flex-1">Outro</Label>
                    </div>
                    {mealQuizData.preferenciaAlimentar === "outro" && (
                      <Input 
                        placeholder="Especifique sua preferência"
                        value={mealQuizData.preferenciaOutro}
                        onChange={(e) => setMealQuizData({...mealQuizData, preferenciaOutro: e.target.value})}
                      />
                    )}
                  </RadioGroup>
                )}

                {mealQuizStep === 5 && (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">Selecione todas que se aplicam:</p>
                    {["Lactose", "Glúten", "Frutos do mar", "Amendoim", "Nenhuma", "Outra"].map((restricao) => (
                      <div key={restricao} className="flex items-center space-x-2 p-4 border-2 rounded-lg">
                        <Checkbox 
                          id={restricao}
                          checked={mealQuizData.restricaoAlimentar.includes(restricao)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setMealQuizData({...mealQuizData, restricaoAlimentar: [...mealQuizData.restricaoAlimentar, restricao]});
                            } else {
                              setMealQuizData({...mealQuizData, restricaoAlimentar: mealQuizData.restricaoAlimentar.filter(r => r !== restricao)});
                            }
                          }}
                        />
                        <Label htmlFor={restricao} className="cursor-pointer flex-1">{restricao}</Label>
                      </div>
                    ))}
                    {mealQuizData.restricaoAlimentar.includes("Outra") && (
                      <Input 
                        placeholder="Especifique sua restrição"
                        value={mealQuizData.restricaoOutra}
                        onChange={(e) => setMealQuizData({...mealQuizData, restricaoOutra: e.target.value})}
                      />
                    )}
                  </div>
                )}

                {mealQuizStep === 6 && (
                  <RadioGroup value={mealQuizData.estiloCardapio} onValueChange={(value) => setMealQuizData({...mealQuizData, estiloCardapio: value})}>
                    <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-green-500 cursor-pointer">
                      <RadioGroupItem value="pratico" id="pratico" />
                      <Label htmlFor="pratico" className="cursor-pointer flex-1">Prático e rápido</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-green-500 cursor-pointer">
                      <RadioGroupItem value="elaborado" id="elaborado" />
                      <Label htmlFor="elaborado" className="cursor-pointer flex-1">Elaborado (gosto de cozinhar)</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-green-500 cursor-pointer">
                      <RadioGroupItem value="misto" id="misto" />
                      <Label htmlFor="misto" className="cursor-pointer flex-1">Misto (depende do dia)</Label>
                    </div>
                  </RadioGroup>
                )}

                {mealQuizStep === 7 && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="refeicoesdia">Quantas refeições por dia?</Label>
                      <Input 
                        id="refeicoesdia" 
                        type="number" 
                        placeholder="Ex: 5"
                        value={mealQuizData.refeicoesdia}
                        onChange={(e) => setMealQuizData({...mealQuizData, refeicoesdia: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="orcamento">Orçamento mensal para alimentação (R$)</Label>
                      <Input 
                        id="orcamento" 
                        type="number" 
                        placeholder="Ex: 800"
                        value={mealQuizData.orcamento}
                        onChange={(e) => setMealQuizData({...mealQuizData, orcamento: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="alimentosNaoGosta">Alimentos que você não gosta (opcional)</Label>
                      <Textarea 
                        id="alimentosNaoGosta" 
                        placeholder="Ex: Berinjela, couve-flor..."
                        value={mealQuizData.alimentosNaoGosta}
                        onChange={(e) => setMealQuizData({...mealQuizData, alimentosNaoGosta: e.target.value})}
                      />
                    </div>
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  {mealQuizStep > 1 && (
                    <Button 
                      variant="outline" 
                      onClick={handleMealQuizPrev}
                      className="flex-1"
                    >
                      Anterior
                    </Button>
                  )}
                  <Button 
                    onClick={handleMealQuizNext}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                  >
                    {mealQuizStep === 7 ? "Gerar Cardápio" : "Próximo"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Workout Quiz View
  if (currentView === "workout-quiz") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Dumbbell className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Quiz de Treinos</h1>
                  <p className="text-xs text-gray-600">Passo {workoutQuizStep} de 7</p>
                </div>
              </div>
              <Button variant="outline" onClick={handleBackToDashboard}>
                Voltar
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(workoutQuizStep / 7) * 100}%` }}
                />
              </div>
            </div>

            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="text-2xl">
                  {workoutQuizStep === 1 && "Qual é o seu objetivo com os treinos?"}
                  {workoutQuizStep === 2 && "Qual é o seu nível atual?"}
                  {workoutQuizStep === 3 && "Que tipo de treino você prefere?"}
                  {workoutQuizStep === 4 && "Disponibilidade"}
                  {workoutQuizStep === 5 && "Equipamentos disponíveis"}
                  {workoutQuizStep === 6 && "Limitações físicas"}
                  {workoutQuizStep === 7 && "Preferências finais"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {workoutQuizStep === 1 && (
                  <RadioGroup value={workoutQuizData.objetivo} onValueChange={(value) => setWorkoutQuizData({...workoutQuizData, objetivo: value})}>
                    <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-blue-500 cursor-pointer">
                      <RadioGroupItem value="emagrecer" id="w-emagrecer" />
                      <Label htmlFor="w-emagrecer" className="cursor-pointer flex-1">Emagrecer</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-blue-500 cursor-pointer">
                      <RadioGroupItem value="ganhar-massa" id="w-ganhar-massa" />
                      <Label htmlFor="w-ganhar-massa" className="cursor-pointer flex-1">Ganhar massa muscular</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-blue-500 cursor-pointer">
                      <RadioGroupItem value="condicionamento" id="w-condicionamento" />
                      <Label htmlFor="w-condicionamento" className="cursor-pointer flex-1">Melhorar condicionamento físico</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-blue-500 cursor-pointer">
                      <RadioGroupItem value="saude" id="w-saude" />
                      <Label htmlFor="w-saude" className="cursor-pointer flex-1">Saúde e bem-estar geral</Label>
                    </div>
                  </RadioGroup>
                )}

                {workoutQuizStep === 2 && (
                  <RadioGroup value={workoutQuizData.nivel} onValueChange={(value) => setWorkoutQuizData({...workoutQuizData, nivel: value})}>
                    <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-blue-500 cursor-pointer">
                      <RadioGroupItem value="iniciante" id="iniciante" />
                      <Label htmlFor="iniciante" className="cursor-pointer flex-1">Iniciante (nunca treinei ou parei há muito tempo)</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-blue-500 cursor-pointer">
                      <RadioGroupItem value="intermediario" id="intermediario" />
                      <Label htmlFor="intermediario" className="cursor-pointer flex-1">Intermediário (treino regularmente há alguns meses)</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-blue-500 cursor-pointer">
                      <RadioGroupItem value="avancado" id="avancado" />
                      <Label htmlFor="avancado" className="cursor-pointer flex-1">Avançado (treino há mais de 1 ano)</Label>
                    </div>
                  </RadioGroup>
                )}

                {workoutQuizStep === 3 && (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">Selecione todas que se aplicam:</p>
                    {["Funcional em casa", "Corrida/Caminhada", "Dança", "Yoga/Pilates", "Musculação", "Outro"].map((tipo) => (
                      <div key={tipo} className="flex items-center space-x-2 p-4 border-2 rounded-lg">
                        <Checkbox 
                          id={tipo}
                          checked={workoutQuizData.tipoTreino.includes(tipo)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setWorkoutQuizData({...workoutQuizData, tipoTreino: [...workoutQuizData.tipoTreino, tipo]});
                            } else {
                              setWorkoutQuizData({...workoutQuizData, tipoTreino: workoutQuizData.tipoTreino.filter(t => t !== tipo)});
                            }
                          }}
                        />
                        <Label htmlFor={tipo} className="cursor-pointer flex-1">{tipo}</Label>
                      </div>
                    ))}
                  </div>
                )}

                {workoutQuizStep === 4 && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="diasSemana">Quantos dias por semana você pode treinar?</Label>
                      <Input 
                        id="diasSemana" 
                        type="number" 
                        placeholder="Ex: 3"
                        min="1"
                        max="7"
                        value={workoutQuizData.diasSemana}
                        onChange={(e) => setWorkoutQuizData({...workoutQuizData, diasSemana: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="tempoDia">Quanto tempo por dia?</Label>
                      <RadioGroup value={workoutQuizData.tempoDia} onValueChange={(value) => setWorkoutQuizData({...workoutQuizData, tempoDia: value})}>
                        <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-blue-500 cursor-pointer">
                          <RadioGroupItem value="15-30" id="15-30" />
                          <Label htmlFor="15-30" className="cursor-pointer flex-1">15-30 minutos</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-blue-500 cursor-pointer">
                          <RadioGroupItem value="30-45" id="30-45" />
                          <Label htmlFor="30-45" className="cursor-pointer flex-1">30-45 minutos</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-blue-500 cursor-pointer">
                          <RadioGroupItem value="45-60" id="45-60" />
                          <Label htmlFor="45-60" className="cursor-pointer flex-1">45-60 minutos</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-blue-500 cursor-pointer">
                          <RadioGroupItem value="60+" id="60+" />
                          <Label htmlFor="60+" className="cursor-pointer flex-1">Mais de 60 minutos</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                )}

                {workoutQuizStep === 5 && (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">Selecione os equipamentos que você tem:</p>
                    {["Nenhum", "Halteres", "Elásticos", "Colchonete", "Barra fixa", "Outro"].map((equip) => (
                      <div key={equip} className="flex items-center space-x-2 p-4 border-2 rounded-lg">
                        <Checkbox 
                          id={equip}
                          checked={workoutQuizData.equipamento.includes(equip)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setWorkoutQuizData({...workoutQuizData, equipamento: [...workoutQuizData.equipamento, equip]});
                            } else {
                              setWorkoutQuizData({...workoutQuizData, equipamento: workoutQuizData.equipamento.filter(e => e !== equip)});
                            }
                          }}
                        />
                        <Label htmlFor={equip} className="cursor-pointer flex-1">{equip}</Label>
                      </div>
                    ))}
                  </div>
                )}

                {workoutQuizStep === 6 && (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">Você tem alguma limitação física? (opcional)</p>
                    {["Nenhuma", "Problemas no joelho", "Problemas nas costas", "Problemas no ombro", "Outra"].map((limit) => (
                      <div key={limit} className="flex items-center space-x-2 p-4 border-2 rounded-lg">
                        <Checkbox 
                          id={limit}
                          checked={workoutQuizData.limitacao.includes(limit)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setWorkoutQuizData({...workoutQuizData, limitacao: [...workoutQuizData.limitacao, limit]});
                            } else {
                              setWorkoutQuizData({...workoutQuizData, limitacao: workoutQuizData.limitacao.filter(l => l !== limit)});
                            }
                          }}
                        />
                        <Label htmlFor={limit} className="cursor-pointer flex-1">{limit}</Label>
                      </div>
                    ))}
                    {workoutQuizData.limitacao.includes("Outra") && (
                      <Input 
                        placeholder="Especifique sua limitação"
                        value={workoutQuizData.limitacaoOutra}
                        onChange={(e) => setWorkoutQuizData({...workoutQuizData, limitacaoOutra: e.target.value})}
                      />
                    )}
                  </div>
                )}

                {workoutQuizStep === 7 && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="intensidade">Intensidade preferida</Label>
                      <RadioGroup value={workoutQuizData.intensidade} onValueChange={(value) => setWorkoutQuizData({...workoutQuizData, intensidade: value})}>
                        <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-blue-500 cursor-pointer">
                          <RadioGroupItem value="leve" id="int-leve" />
                          <Label htmlFor="int-leve" className="cursor-pointer flex-1">Leve</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-blue-500 cursor-pointer">
                          <RadioGroupItem value="moderada" id="int-moderada" />
                          <Label htmlFor="int-moderada" className="cursor-pointer flex-1">Moderada</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-blue-500 cursor-pointer">
                          <RadioGroupItem value="intensa" id="int-intensa" />
                          <Label htmlFor="int-intensa" className="cursor-pointer flex-1">Intensa</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div>
                      <Label htmlFor="horario">Horário preferido</Label>
                      <RadioGroup value={workoutQuizData.horario} onValueChange={(value) => setWorkoutQuizData({...workoutQuizData, horario: value})}>
                        <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-blue-500 cursor-pointer">
                          <RadioGroupItem value="manha" id="manha" />
                          <Label htmlFor="manha" className="cursor-pointer flex-1">Manhã</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-blue-500 cursor-pointer">
                          <RadioGroupItem value="tarde" id="tarde" />
                          <Label htmlFor="tarde" className="cursor-pointer flex-1">Tarde</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-blue-500 cursor-pointer">
                          <RadioGroupItem value="noite" id="noite" />
                          <Label htmlFor="noite" className="cursor-pointer flex-1">Noite</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  {workoutQuizStep > 1 && (
                    <Button 
                      variant="outline" 
                      onClick={handleWorkoutQuizPrev}
                      className="flex-1"
                    >
                      Anterior
                    </Button>
                  )}
                  <Button 
                    onClick={handleWorkoutQuizNext}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                  >
                    {workoutQuizStep === 7 ? "Gerar Plano de Treinos" : "Próximo"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Meal Plan View
  if (currentView === "meal-plan" && generatedMealPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <UtensilsCrossed className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Seu Cardápio</h1>
                  <p className="text-xs text-gray-600">Plano Personalizado</p>
                </div>
              </div>
              <Button variant="outline" onClick={handleBackToDashboard}>
                Voltar ao Dashboard
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 mb-8 text-white">
              <h2 className="text-2xl font-bold mb-2">Seu Plano Alimentar Está Pronto! 🎉</h2>
              <p className="text-green-50">Meta diária: {generatedMealPlan.caloriasdiarias} calorias</p>
            </div>

            <Tabs defaultValue="semana" className="w-full mb-8">
              <TabsList className="grid w-full grid-cols-2 gap-2 bg-gray-100 p-2 rounded-xl mb-6">
                <TabsTrigger value="semana" className="data-[state=active]:bg-white data-[state=active]:text-green-600 rounded-lg">
                  Cardápio Semanal
                </TabsTrigger>
                <TabsTrigger value="compras" className="data-[state=active]:bg-white data-[state=active]:text-green-600 rounded-lg">
                  Lista de Compras
                </TabsTrigger>
              </TabsList>

              <TabsContent value="semana" className="space-y-6">
                {generatedMealPlan.semana.map((dia: any, index: number) => (
                  <Card key={index} className="border-2 border-gray-200">
                    <CardHeader className="bg-green-50">
                      <CardTitle className="text-xl text-gray-900">{dia.dia}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        {dia.refeicoes.map((refeicao: any, idx: number) => (
                          <div key={idx} className="border-l-4 border-green-500 pl-4 py-2">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-900">{refeicao.nome}</h4>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {refeicao.horario}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Flame className="w-4 h-4" />
                                  {refeicao.calorias} kcal
                                </span>
                              </div>
                            </div>
                            <ul className="text-sm text-gray-700 space-y-1">
                              {refeicao.itens.map((item: string, i: number) => (
                                <li key={i}>• {item}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="compras">
                <Card className="border-2 border-gray-200">
                  <CardHeader className="bg-green-50">
                    <CardTitle className="text-xl text-gray-900">Lista de Compras</CardTitle>
                    <CardDescription>Ingredientes necessários para a semana</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      {generatedMealPlan.listaCompras.map((item: string, index: number) => (
                        <div key={index} className="flex items-center gap-3 p-3 border-2 rounded-lg hover:border-green-500 transition-colors">
                          <div className="w-6 h-6 rounded border-2 border-gray-300" />
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }

  // Workout Plan View
  if (currentView === "workout-plan" && generatedWorkoutPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Dumbbell className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Seu Plano de Treinos</h1>
                  <p className="text-xs text-gray-600">Treinos Personalizados</p>
                </div>
              </div>
              <Button variant="outline" onClick={handleBackToDashboard}>
                Voltar ao Dashboard
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 mb-8 text-white">
              <h2 className="text-2xl font-bold mb-2">Seu Plano de Treinos Está Pronto! 💪</h2>
              <p className="text-blue-50">
                {generatedWorkoutPlan.diasSemana} dias por semana • Nível: {generatedWorkoutPlan.nivel}
              </p>
            </div>

            <Tabs defaultValue="treinos" className="w-full mb-8">
              <TabsList className="grid w-full grid-cols-2 gap-2 bg-gray-100 p-2 rounded-xl mb-6">
                <TabsTrigger value="treinos" className="data-[state=active]:bg-white data-[state=active]:text-blue-600 rounded-lg">
                  Treinos Semanais
                </TabsTrigger>
                <TabsTrigger value="metas" className="data-[state=active]:bg-white data-[state=active]:text-blue-600 rounded-lg">
                  Metas e Dicas
                </TabsTrigger>
              </TabsList>

              <TabsContent value="treinos" className="space-y-6">
                {generatedWorkoutPlan.semana.map((dia: any, index: number) => (
                  <Card key={index} className="border-2 border-gray-200">
                    <CardHeader className="bg-blue-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl text-gray-900">{dia.dia}</CardTitle>
                          <CardDescription className="mt-1">{dia.tipo}</CardDescription>
                        </div>
                        <div className="text-right text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {dia.duracao}
                          </div>
                          <div className="capitalize mt-1">
                            {dia.intensidade}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-3">
                        {dia.exercicios.map((exercicio: Exercise, idx: number) => (
                          <div 
                            key={idx} 
                            className="border-l-4 border-blue-500 pl-4 py-3 hover:bg-blue-50 rounded-r-lg transition-colors cursor-pointer"
                            onClick={() => handleExerciseClick(exercicio)}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                                {exercicio.nome}
                                <Info className="w-4 h-4 text-blue-500" />
                              </h4>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span>{exercicio.series}</span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {exercicio.tempo}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600">{exercicio.descricao}</p>
                            <p className="text-xs text-blue-600 mt-1">Clique para ver instruções detalhadas</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="metas">
                <div className="space-y-6">
                  <Card className="border-2 border-gray-200">
                    <CardHeader className="bg-blue-50">
                      <CardTitle className="text-xl text-gray-900">Suas Metas</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="border-l-4 border-blue-500 pl-4 py-2">
                          <h4 className="font-semibold text-gray-900 mb-1">Meta Semanal</h4>
                          <p className="text-gray-700">{generatedWorkoutPlan.metas.semanal}</p>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4 py-2">
                          <h4 className="font-semibold text-gray-900 mb-1">Meta Mensal</h4>
                          <p className="text-gray-700">{generatedWorkoutPlan.metas.mensal}</p>
                        </div>
                        <div className="border-l-4 border-purple-500 pl-4 py-2">
                          <h4 className="font-semibold text-gray-900 mb-1">Meta Trimestral</h4>
                          <p className="text-gray-700">{generatedWorkoutPlan.metas.trimestral}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-gray-200">
                    <CardHeader className="bg-green-50">
                      <CardTitle className="text-xl text-gray-900">Dicas Importantes</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ul className="space-y-3">
                        {generatedWorkoutPlan.dicas.map((dica: string, index: number) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-green-600 text-sm font-semibold">{index + 1}</span>
                            </div>
                            <span className="text-gray-700">{dica}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Exercise Instructions Dialog */}
        <Dialog open={exerciseDialogOpen} onOpenChange={setExerciseDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedExercise?.nome}</DialogTitle>
              <DialogDescription className="text-base">
                {selectedExercise?.descricao}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4 text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Séries:</span>
                  <span>{selectedExercise?.series}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{selectedExercise?.tempo}</span>
                </div>
              </div>
              
              {selectedExercise?.instrucoes && (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Info className="w-5 h-5 text-blue-500" />
                    Como Executar:
                  </h4>
                  <p className="text-gray-700 leading-relaxed">{selectedExercise.instrucoes}</p>
                </div>
              )}

              <div className="bg-yellow-50 border-2 border-yellow-200 p-4 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>⚠️ Importante:</strong> Mantenha sempre uma boa postura e respeite seus limites. 
                  Se sentir dor, pare imediatamente e consulte um profissional.
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Calories View
  if (currentView === "calories") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Controle de Calorias</h1>
                  <p className="text-xs text-gray-600">Análise Nutricional</p>
                </div>
              </div>
              <Button variant="outline" onClick={handleBackToDashboard}>
                Voltar
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="text-2xl">Descreva seu prato</CardTitle>
                <CardDescription>
                  Conte o que você comeu e descubra as calorias e nutrientes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="plate">Descrição do prato</Label>
                  <Textarea 
                    id="plate"
                    placeholder="Ex: 1 prato de arroz com feijão, 1 bife de frango grelhado, salada de alface e tomate..."
                    rows={6}
                    value={plateDescription}
                    onChange={(e) => setPlateDescription(e.target.value)}
                  />
                </div>

                <Button 
                  onClick={handleAnalyzeCalories}
                  disabled={analyzing || !plateDescription}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
                >
                  {analyzing ? "Analisando..." : "Analisar Calorias"}
                </Button>

                {caloriesResult && (
                  <div className="space-y-4 pt-4">
                    <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-4 text-center text-xl">
                        Resultado da Análise
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg text-center">
                          <p className="text-sm text-gray-600 mb-1">Calorias</p>
                          <p className="text-2xl font-bold text-purple-600">{caloriesResult.calorias}</p>
                          <p className="text-xs text-gray-500">kcal</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg text-center">
                          <p className="text-sm text-gray-600 mb-1">Proteínas</p>
                          <p className="text-2xl font-bold text-blue-600">{caloriesResult.proteinas}</p>
                          <p className="text-xs text-gray-500">g</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg text-center">
                          <p className="text-sm text-gray-600 mb-1">Carboidratos</p>
                          <p className="text-2xl font-bold text-green-600">{caloriesResult.carboidratos}</p>
                          <p className="text-xs text-gray-500">g</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg text-center">
                          <p className="text-sm text-gray-600 mb-1">Gorduras</p>
                          <p className="text-2xl font-bold text-orange-600">{caloriesResult.gorduras}</p>
                          <p className="text-xs text-gray-500">g</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return <div>View: {currentView}</div>;
}
