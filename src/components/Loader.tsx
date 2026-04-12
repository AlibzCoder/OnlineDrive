const Loader = ({ className, ...otherProps }: { className?: string } & React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`lds-ellipsis ${className}`} {...otherProps}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);
export default Loader;
