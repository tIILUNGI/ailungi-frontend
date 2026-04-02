import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import { Course } from '../../data/courses';
import { api } from '../../services/api';

const Courses = () => {
  const [coursesList, setCoursesList] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState('');
  const [selectedArea, setSelectedArea] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  useEffect(() => {
    let isMounted = true;

    api
      .getCourses()
      .then(({ data }) => {
        if (isMounted) {
          setCoursesList(data);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const query = searchParams.get('pesquisa') ?? '';
    const area = searchParams.get('area') ?? 'all';
    setSearchValue(query);
    setSelectedArea(area);
    setCurrentPage(1);
  }, [searchParams]);

  const totalCourses = coursesList.length;
  const areas = useMemo(() => [...new Set(coursesList.map((course) => course.area))], [coursesList]);
  const featuredCount = coursesList.filter((course) => course.featured).length;

  const filteredCourses = useMemo(() => {
    const query = (searchParams.get('pesquisa') ?? '').trim().toLowerCase();
    const area = searchParams.get('area') ?? 'all';

    return coursesList.filter((course) => {
      if (area !== 'all' && course.area !== area) {
        return false;
      }
      if (query) {
        const haystack = `${course.name} ${course.code} ${course.area}`.toLowerCase();
        return haystack.includes(query);
      }
      return true;
    });
  }, [coursesList, searchParams]);

  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / itemsPerPage));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params: Record<string, string> = {};
    if (searchValue.trim()) {
      params.pesquisa = searchValue.trim();
    }
    if (selectedArea !== 'all') {
      params.area = selectedArea;
    }
    setSearchParams(params);
  };

  const handleAreaChange = (value: string) => {
    setSelectedArea(value);
    const params: Record<string, string> = {};
    if (searchValue.trim()) {
      params.pesquisa = searchValue.trim();
    }
    if (value !== 'all') {
      params.area = value;
    }
    setSearchParams(params);
  };

  const pageNumbers = useMemo(() => {
    const maxButtons = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxButtons - 1);
    if (end - start < maxButtons - 1) {
      start = Math.max(1, end - maxButtons + 1);
    }
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }, [currentPage, totalPages]);

  return (
    <section className="section">
      <div className="container">
        <div className="page-hero page-hero--corporate">
          <span className="badge">Catálogo ILUNGI</span>
          <h1>Catálogo de Cursos</h1>
          <p>
            Programas executivos em governança, risco, compliance, finanças e liderança. Escolha a
            especialidade ideal para o seu momento profissional.
          </p>
        </div>

        <div className="stat-grid" style={{ marginBottom: '28px' }}>
          <div className="stat-card">
            <strong>{totalCourses}</strong>
            <span>Cursos ativos</span>
            <p>Conteúdos alinhados às normas internacionais.</p>
          </div>
          <div className="stat-card">
            <strong>{areas.length}</strong>
            <span>áreas executivas</span>
            <p>Trilhas especializadas para líderes e equipas.</p>
          </div>
          <div className="stat-card">
            <strong>{featuredCount}</strong>
            <span>Destaques</span>
            <p>Programas mais procurados por empresas.</p>
          </div>
        </div>

        <div className="catalog-toolbar">
          <form className="catalog-search" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Pesquisar por curso, área ou código..."
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              className="form-input"
            />
            <button type="submit" className="btn btn-primary btn-sm">
              Pesquisar
            </button>
          </form>
          <div className="catalog-filter">
            <label>Área</label>
            <select
              value={selectedArea}
              onChange={(event) => handleAreaChange(event.target.value)}
              className="form-input"
            >
              <option value="all">Todas as áreas</option>
              {areas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="catalog-meta">
          <span>{filteredCourses.length} cursos encontrados</span>
          <span>
            Página {currentPage} de {totalPages}
          </span>
        </div>

        {isLoading ? (
          <div className="empty-state">
            <p>A carregar catálogo...</p>
          </div>
        ) : filteredCourses.length > 0 ? (
          <>
            <div className="course-catalog">
              {paginatedCourses.map((course) => (
                <div key={course.id} className="course-catalog-item">
                  <div className="course-catalog-code">{course.code}</div>
                  <div className="course-catalog-info">
                    <div className="course-catalog-header">
                      <h3 className="course-catalog-name clamp-2">{course.name}</h3>
                      {course.featured && <span className="pill pill--accent">Destaque</span>}
                    </div>
                    <span className="course-catalog-area">{course.area}</span>
                  </div>
                  <div className="course-catalog-meta">
                    <div className="course-catalog-meta-item">
                      <span className="label">Carga Horária</span>
                      <span className="value">{course.workload}</span>
                    </div>
                    <div className="course-catalog-meta-item">
                      <span className="label">Modalidade</span>
                      <span className="value">{course.modality}</span>
                    </div>
                    <div className="course-catalog-meta-item">
                      <span className="label">Agenda</span>
                      <span className="value">{course.schedule}</span>
                    </div>
                  </div>
                  <div className="course-catalog-action">
                    <NavLink to={`/cursos/${course.id}`} className="btn btn-primary">
                      Saber mais
                    </NavLink>
                  </div>
                </div>
              ))}
            </div>

            {filteredCourses.length > itemsPerPage && (
              <div className="pagination">
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                >
                  Anterior
                </button>
                <div className="pagination-pages">
                  {pageNumbers.map((page) => (
                    <button
                      key={page}
                      type="button"
                      className={`pagination-page${page === currentPage ? ' is-active' : ''}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                >
                  Próxima
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="empty-state">
            <h3>Nenhum curso encontrado</h3>
            <p>
              {coursesList.length > 0
                ? 'Tente ajustar a pesquisa ou selecionar outra área.'
                : 'O catálogo será atualizado assim que os cursos forem publicados.'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Courses;

