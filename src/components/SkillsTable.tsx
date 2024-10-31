import { css } from "../styled-system/css/css.mjs";

export const SkillsTable = (props: {
  skills: {
    name: string;
    level: number;
  }[];
}) => (
  <table
    class={css`
      width: 100%;
      font-size: x-large;
    `}
  >
    <tbody>
      {props.skills.map((skill) => (
        <tr key={skill.name}>
          <td>
            {"★".repeat(skill.level) + "☆".repeat(5 - skill.level)}
          </td>
          <td>{skill.name}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
