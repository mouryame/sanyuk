export const Glass = ({ className, children, ...prop }) => (
  <div className={`bg-[#22222250] backdrop-blur-md ${className}`} {...prop}>
    {children}
  </div>
);
