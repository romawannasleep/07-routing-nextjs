import css from './SidebarNotes.module.css'

type Props = {
  children?: React.ReactNode;
}

const tags = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

const SidebarNotes = async ({ children }: Props) => {
  return (
    <div>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <a href={`/notes/filter/all`} className={css.menuLink}>
            All notes
          </a>
        </li>

        {tags.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <a href={`/notes/filter/${encodeURIComponent(tag)}`} className={css.menuLink}>
              {tag}
            </a>
          </li>
        ))}

      </ul>
      {children}
    </div>
  );
};

export default SidebarNotes;
