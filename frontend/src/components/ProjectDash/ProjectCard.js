function ProjectCard({ name, owner, lastUpdated }) {
  return (
    <div className="projectCard">
      <h1>{name}</h1>
      <h2>Owned by: {owner}</h2>
      <h3>last updated: {lastUpdated}</h3>
    </div>
  );
}

export default ProjectCard;
