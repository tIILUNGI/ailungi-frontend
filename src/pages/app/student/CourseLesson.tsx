import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courses, getCourseById } from '../../../data/courses';
import { useI18n } from '../../../i18n/I18nContext';

type Lesson = {
  id: number;
  title: string;
  duration: string;
  type: 'video' | 'exercise' | 'reading' | 'quiz';
  completed: boolean;
};

const StudentCourseLesson = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const courseId = parseInt(id || '1');
  const course = getCourseById(courseId) || courses[0];
  
  // Mock lessons data
  const [lessons, setLessons] = useState<Lesson[]>([
    { id: 1, title: 'Introdução ao Curso', duration: '15 min', type: 'video', completed: true },
    { id: 2, title: 'Conceitos Fundamentais', duration: '30 min', type: 'video', completed: true },
    { id: 3, title: 'Exercício 1: Aplicação Prática', duration: '45 min', type: 'exercise', completed: false },
    { id: 4, title: 'Normas ISO 37001 - Visão Geral', duration: '25 min', type: 'reading', completed: false },
    { id: 5, title: 'Quiz de Avaliação', duration: '20 min', type: 'quiz', completed: false },
    { id: 6, title: 'Sistema de Gestão Antissuborno', duration: '35 min', type: 'video', completed: false },
    { id: 7, title: 'Exercício 2: Caso de Estudo', duration: '60 min', type: 'exercise', completed: false },
    { id: 8, title: 'Auditoria Interna', duration: '40 min', type: 'video', completed: false },
    { id: 9, title: 'Avaliação Final', duration: '30 min', type: 'quiz', completed: false },
  ]);

  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(
    lessons.find(l => !l.completed) || lessons[0]
  );

  const completedCount = lessons.filter(l => l.completed).length;
  const progress = Math.round((completedCount / lessons.length) * 100);

  const getLessonTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        );
      case 'exercise':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
        );
      case 'reading':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        );
      case 'quiz':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        );
      default:
        return null;
    }
  };

  const handleCompleteLesson = (lessonId: number) => {
    setLessons(prev =>
      prev.map(l =>
        l.id === lessonId ? { ...l, completed: true } : l
      )
    );
    
    // Move to next incomplete lesson
    const nextLesson = lessons.find(l => !l.completed && l.id !== lessonId);
    if (nextLesson) {
      setCurrentLesson(nextLesson);
    }
  };

  return (
    <div className="course-lesson-page">
      <div className="lesson-sidebar">
        <div className="lesson-header">
          <button 
            type="button" 
            className="btn btn-ghost btn-sm"
            onClick={() => navigate('/app/aluno/percurso')}
          >
            ← Voltar
          </button>
          <h3>{course.name}</h3>
          <div className="lesson-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <span>{progress}% completo</span>
          </div>
        </div>
        
        <div className="lesson-list">
          {lessons.map((lesson) => (
            <button
              key={lesson.id}
              type="button"
              className={`lesson-item ${currentLesson?.id === lesson.id ? 'active' : ''} ${lesson.completed ? 'completed' : ''}`}
              onClick={() => setCurrentLesson(lesson)}
            >
              <span className={`lesson-icon ${lesson.type}`}>
                {getLessonTypeIcon(lesson.type)}
              </span>
              <div className="lesson-info">
                <span className="lesson-title">{lesson.title}</span>
                <span className="lesson-duration">{lesson.duration}</span>
              </div>
              {lesson.completed && (
                <span className="lesson-check">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="lesson-content">
        {currentLesson ? (
          <>
            <div className="content-header">
              <span className={`lesson-type-badge ${currentLesson.type}`}>
                {currentLesson.type === 'video' && 'Vídeo'}
                {currentLesson.type === 'exercise' && 'Exercício'}
                {currentLesson.type === 'reading' && 'Leitura'}
                {currentLesson.type === 'quiz' && 'Quiz'}
              </span>
              <span className="lesson-time">{currentLesson.duration}</span>
            </div>
            
            <h2>{currentLesson.title}</h2>
            
            <div className="content-body">
              {currentLesson.type === 'video' && (
                <div className="video-placeholder">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  <p>Conteúdo em vídeo</p>
                  <p className="muted">播放 {currentLesson.duration}</p>
                </div>
              )}
              
              {currentLesson.type === 'reading' && (
                <div className="reading-content">
                  <h3>Objetivos de Aprendizagem</h3>
                  <ul>
                    <li>Compreender os conceitos fundamentais de {course.name}</li>
                    <li>Identificar os requisitos principais das normas aplicáveis</li>
                    <li>Aplicar os conhecimentos em contextos práticos</li>
                  </ul>
                  
                  <h3>Conteúdo Principal</h3>
                  <p>
                    Este módulo aborda os conceitos essenciais relacionados com {course.name}.
                    Ao longo desta unidade, irá aprender os fundamentos teóricos e práticos
                    necessários para a implementação eficaz de um sistema de gestão.
                  </p>
                  
                  <h3>Pontos-Chave</h3>
                  <ul>
                    <li>Primeiro ponto importante sobre o tema</li>
                    <li>Segundo ponto relevante para a compreensão</li>
                    <li>Terceiro aspeto fundamental</li>
                  </ul>
                </div>
              )}
              
              {currentLesson.type === 'exercise' && (
                <div className="exercise-content">
                  <h3>Exercício Prático</h3>
                  <p>
                    Aplique os conhecimentos adquiridos nesta atividade prática.
                    Complete o exercício abaixo e submeta a sua resposta.
                  </p>
                  
                  <div className="exercise-box">
                    <h4>Caso de Estudo</h4>
                    <p>
                      Uma empresa do setor industrial enfrenta desafios relacionados
                      com práticas de suborno em operações internacionais. Como
                      responsável de compliance, elabore um plano de ação.
                    </p>
                    
                    <textarea 
                      placeholder="Escreva a sua resposta aqui..."
                      rows={6}
                      className="form-input"
                    />
                    
                    <button type="button" className="btn btn-primary">
                      Submeter Resposta
                    </button>
                  </div>
                </div>
              )}
              
              {currentLesson.type === 'quiz' && (
                <div className="quiz-content">
                  <h3>Avaliação</h3>
                  <p>Responda às seguintes questões para avaliar os seus conhecimentos.</p>
                  
                  <div className="quiz-question">
                    <h4>Questão 1</h4>
                    <p>Qual é o objetivo principal de um sistema de gestão antissuborno?</p>
                    <div className="quiz-options">
                      <label className="quiz-option">
                        <input type="radio" name="q1" />
                        <span>Prevenir e detectar subornos</span>
                      </label>
                      <label className="quiz-option">
                        <input type="radio" name="q1" />
                        <span>Aumentar lucros</span>
                      </label>
                      <label className="quiz-option">
                        <input type="radio" name="q1" />
                        <span>Reduzir funcionários</span>
                      </label>
                    </div>
                  </div>
                  
                  <button type="button" className="btn btn-primary">
                    Submeter Respostas
                  </button>
                </div>
              )}
            </div>
            
            {!currentLesson.completed && (
              <div className="content-footer">
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={() => handleCompleteLesson(currentLesson.id)}
                >
                  Marcar como Concluído
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="no-lesson">
            <p>Selecione uma lição para começar</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentCourseLesson;
