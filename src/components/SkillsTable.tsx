import { css } from "../styled-system/css/css.mjs";
import { GradientText } from "./GradientText.tsx";

export const SkillsTable = (props: {
  skills: {
    name: string;
    level: number;
    description: string;
  }[];
}) => (
  <table
    class={css`
      font-size: x-large;
    `}
  >
    <tbody>
      {props.skills.map((skill) => (
        <tr key={skill.name}>
          <td class={css`vertical-align: top; padding-right: 2rem;`}>
            {skill.level === 5 ? <GradientText>★★★★★</GradientText> : (
              <span>
                {"★".repeat(skill.level) + "☆".repeat(5 - skill.level)}
              </span>
            )}
          </td>
          <td class={css`vertical-align: top;`}>
            <details>
              <summary>{skill.name}</summary>
              <div class={css`font-size: large;`}>{skill.description}</div>
            </details>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
