'use client';

import { useState } from 'react';
import Button from './Button';
import H2 from './H2';

interface CourseSchedule {
  day: string;
  cours: string;
  horaire: string;
  lieu: string;
  dayOfWeek: number; // 0 = Dimanche, 1 = Lundi, etc.
}

const coursesSchedule: CourseSchedule[] = [
  {
    day: "Mercredi",
    cours: "Hatha Yoga",
    horaire: "20h15-21h15",
    lieu: "Paris 12 Place d'Aligre",
    dayOfWeek: 3
  },
];

export default function WeeklyPlanning() {
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const mondayDate = new Date(today);
    mondayDate.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
    return mondayDate;
  });

  const getWeekDates = (startDate: Date) => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short'
    });
  };

  const formatWeekRange = (startDate: Date) => {
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    
    return `${startDate.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long'
    })} - ${endDate.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })}`;
  };

  const goToPreviousWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(currentWeekStart.getDate() - 7);
    setCurrentWeekStart(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(currentWeekStart.getDate() + 7);
    setCurrentWeekStart(newDate);
  };

  const weekDates = getWeekDates(currentWeekStart);
  
  const getCoursesForWeek = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for accurate comparison
    
    return coursesSchedule.map(course => {
      const courseDate = weekDates[course.dayOfWeek === 0 ? 6 : course.dayOfWeek - 1];
      const isPastDate = courseDate < today;
      
      return {
        ...course,
        date: formatDate(courseDate),
        fullDate: courseDate,
        isPastDate
      };
    });
  };

  const weekCourses = getCoursesForWeek();

  return (
    <section className="py-16 md:py-20 px-4 md:px-6 ">
      <div className="max-w-6xl mx-auto">
        <H2 kicker="Planning">Planning hebdomadaire</H2>
        
        {/* Navigation par semaine - Améliorée pour mobile */}
        <div className="flex items-center justify-center gap-2 md:gap-4 mb-8">
          <button
            onClick={goToPreviousWeek}
            className="flex items-center justify-center w-12 h-12 md:w-10 md:h-10 rounded-full bg-green-100 hover:bg-green-200 transition-colors touch-manipulation"
            aria-label="Semaine précédente"
          >
            <svg className="w-6 h-6 md:w-5 md:h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="text-center px-2">
            <h3 className="text-base md:text-lg font-semibold text-gray-800 whitespace-nowrap">
              {formatWeekRange(currentWeekStart)}
            </h3>
          </div>
          
          <button
            onClick={goToNextWeek}
            className="flex items-center justify-center w-12 h-12 md:w-10 md:h-10 rounded-full bg-green-100 hover:bg-green-200 transition-colors touch-manipulation"
            aria-label="Semaine suivante"
          >
            <svg className="w-6 h-6 md:w-5 md:h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Affichage mobile-friendly avec cartes */}
        <div className="space-y-4">
          {weekCourses.length > 0 ? (
            weekCourses.map((course, i) => (
              <div 
                key={i} 
                className={`bg-white rounded-xl border border-gray-200 p-4 md:p-6 shadow-sm ${
                  course.isPastDate ? 'opacity-75' : ''
                }`}
              >
                {/* Header avec jour et date */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div className="mb-3 sm:mb-0">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                      {course.cours}
                    </h3>
                    <div className="flex items-center text-emerald-600 font-medium mt-1">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {course.day} {course.date}
                    </div>
                  </div>
                  
                  {/* Bouton d'action */}
                  <div className="flex-shrink-0">
                    {course.isPastDate ? (
                      <span className="inline-flex items-center px-4 py-2 rounded-lg text-sm bg-gray-400 text-white cursor-not-allowed">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Terminé
                      </span>
                    ) : (
                      <Button
                        onClick={async (e) => {
                          e.preventDefault();

                          
                          try {
                            
                            const response = await fetch('/api/create-checkout-session', {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                courseData: {
                                  day: course.day,
                                  date: course.date,
                                  cours: course.cours,
                                  horaire: course.horaire,
                                  lieu: course.lieu,
                                }
                              }),
                            });

                            console.log('📡 Réponse reçue, status:', response.status);
                            
                            if (!response.ok) {
                              const errorData = await response.text();
                              console.error('❌ Erreur API:', errorData);
                              alert('Erreur lors de la création de la session de paiement');
                              return;
                            }

                            const result = await response.json();
                            console.log('📦 Données reçues:', result);
                            
                            if (result.url) {
                              console.log('🔗 Ouverture dans un nouvel onglet:', result.url);
                              window.open(result.url, '_blank');
                            } else {
                              console.error('❌ Pas d\'URL dans la réponse');
                              alert('Erreur lors de la création de la session de paiement');
                            }
                          } catch (error) {
                            console.error('❌ Erreur complète:', error);
                            alert('Erreur lors de la réservation: ' + error);
                          }
                        }}
                        
                        className="w-full sm:w-auto"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Réserver
                      </Button>
                    )}
                  </div>
                </div>

                {/* Détails du cours */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">{course.horaire}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{course.lieu}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-500 italic text-lg">
                Aucun cours programmé cette semaine
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Utilisez les flèches pour naviguer vers d'autres semaines
              </p>
            </div>
          )}
        </div>

        {/* Information supplémentaire */}
        <div className="mt-8 text-center">
          <div className="bg-emerald-50 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-sm text-emerald-800 font-medium">
              💡 Naviguer entre les semaines
            </p>
            <p className="text-xs text-emerald-600 mt-1">
              Utilisez les flèches pour voir les autres semaines
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}