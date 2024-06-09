import styles from './RepoList.module.scss'
import { Link } from 'react-router-dom';
import Pagination from '../components/layout/Pagination';
import { useFetchRepos } from '../apis/useFetchRepos';
import Spinner from '../components/ui/Spinner';
import ErrorMessage from '../components/ui/ErrorMessage';

interface RepoListProps {
  currentPage: number
  setCurrentPage: Function
}

const RepoList: React.FC<RepoListProps> = ({currentPage, setCurrentPage}) => {
  const repoQuery = useFetchRepos(currentPage)

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (repoQuery.isLoading) {
    return <Spinner />;
  }

  if (repoQuery.isError) {
    return <ErrorMessage message={repoQuery.error.message} />;
  }

  return (
    <div>
      {repoQuery.isSuccess &&
        <div>
          {
            repoQuery.data.totalPages > 1 && 
              <Pagination currentPage={currentPage} totalPages={repoQuery.data.totalPages} handlePageChange={handlePageChange}/>
          }
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>⭐</th>
              </tr>
            </thead>

            <tbody data-testid="repo-list">
              {repoQuery.data.repositories.map(repo => (
                <tr key={repo.id}>
                  <td>
                    <Link 
                      to={`/repository/${repo.owner.login}/${repo.name}`}
                      state={{ repository: repo }}
                    >
                      {repo.name}
                    </Link>
                  </td>
                  <td>
                    {repo.stargazers_count}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      }
    </div>
  );
  
};

export default RepoList;
