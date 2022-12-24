import './Layout.scss';

export const Layout = ({ children, className }) => {
    const layoutClassName = className ? `layoutContainer ${className}` : 'layoutContainer';

    return (
        <div className={layoutClassName}>
            {children}
        </div>
    );
}