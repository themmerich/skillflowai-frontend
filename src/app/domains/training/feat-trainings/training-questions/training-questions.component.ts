import { Component, Input, OnChanges } from '@angular/core';
import { Training } from '../../model/training';
import { Question } from '../../model/question';
import { TreeTableComponent } from '@ui/tree-table/tree-table.component';
import { TreeNode } from 'primeng/api';
import { Answer } from '../../model/answer';
import { ToolbarComponent } from '@ui/toolbar/toolbar.component';

@Component({
  selector: 'sf-training-questions',
  imports: [TreeTableComponent, ToolbarComponent],
  templateUrl: './training-questions.component.html',
  styleUrl: './training-questions.component.scss',
})
export class TrainingQuestionsComponent implements OnChanges {
  @Input() training!: Training;
  data?: TreeNode[];

  columns = [
    { field: 'question', header: 'training.questions.question', type: 'string', headerStyle: 'width: 65%' },
    { field: 'isCorrect', header: 'training.questions.isCorrect', type: 'icon', headerStyle: 'width: 20%' },
  ];

  ngOnChanges() {
    if (this.training) {
      // TODO: this.data = this.convertQuestionToTreeNode(this.training.questions);
    }
  }

  convertQuestionToTreeNode(data?: Question[]): TreeNode[] {
    if (data) {
      return data.map((item) => ({
        data: { id: item.id, question: item.question, isCorrect: null, isParent: true },
        children: item.answers ? this.convertAnswerToTreeNode(item.answers) : undefined,
      }));
    }
    return [];
  }

  convertAnswerToTreeNode(data: Answer[]): TreeNode[] {
    return data.map((item) => ({
      data: { id: item.id, question: item.answer, isCorrect: item.isCorrect ? 'yes' : 'no', isParent: false },
    }));
  }

  onDelete(question: any) {
    if (this.data) {
      for (const node of this.data) {
        node.children = node.children!.filter((q) => q.data.id !== question.id);
      }
      this.data = this.data.filter((q) => q.data.id !== question.id);
    }
  }

  onEdit(question: any) {
    console.log(question);
  }

  addQuestion() {}
}
