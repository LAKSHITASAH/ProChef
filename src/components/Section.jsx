export default function Section({ icon, title, children }) {
  return (
    <div className="container-fluid px-3 px-md-4 mt-4">
      <div className="glass p-4">
        <div className="section-title mb-3">
          <span className="text-warning">{icon}</span>
          <span>{title}</span>
        </div>
        {children}
      </div>
    </div>
  );
}
