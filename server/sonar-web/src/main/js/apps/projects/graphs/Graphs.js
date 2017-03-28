/*
 * SonarQube
 * Copyright (C) 2009-2017 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
// @flow
import React from 'react';
import GraphsHeader from './GraphsHeader';
import QualityModel from './QualityModel';
import Bugs from './Bugs';
import Vulnerabilities from './Vulnerabilities';
import CodeSmells from './CodeSmells';
import UncoveredLines from './UncoveredLines';
import DuplicatedBlocks from './DuplicatedBlocks';
import { localizeSorting } from '../utils';
import { translate, translateWithParameters } from '../../../helpers/l10n';

export default class Graphs extends React.PureComponent {
  props: {
    displayOrganizations: boolean,
    onGraphChange: (string) => void,
    projects?: Array<*>,
    sort?: string,
    total?: number,
    graph: string
  };

  renderGraph(projects: Array<*>) {
    const graphToComponent = {
      quality: QualityModel,
      bugs: Bugs,
      vulnerabilities: Vulnerabilities,
      code_smells: CodeSmells,
      uncovered_lines: UncoveredLines,
      duplicated_blocks: DuplicatedBlocks
    };
    const Component = graphToComponent[this.props.graph];

    return Component
      ? <Component displayOrganizations={this.props.displayOrganizations} projects={projects} />
      : null;
  }

  renderFooter() {
    const { projects, total, sort } = this.props;

    const limitReached = projects != null && total != null && projects.length < total;

    return (
      <footer className="projects-graph-footer">
        <p>{translate('projects.graph', this.props.graph, 'description')}</p>
        {limitReached &&
          <p className="note spacer-top">
            {translateWithParameters(
              'projects.limited_set_of_projects',
              // $FlowFixMe
              projects.length,
              localizeSorting(sort)
            )}
          </p>}
      </footer>
    );
  }

  render() {
    const { projects } = this.props;

    return (
      <div className="boxed-group projects-graphs">
        <GraphsHeader onGraphChange={this.props.onGraphChange} graph={this.props.graph} />
        <div className="projects-graph">
          <div>
            {projects != null && this.renderGraph(projects)}
          </div>
        </div>
        {this.renderFooter()}
      </div>
    );
  }
}
