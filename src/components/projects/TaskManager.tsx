import React, { useState } from 'react';
import { Plus, Check, Trash2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
}

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Implement user authentication",
      description: "Add login/signup functionality with JWT tokens",
      status: "completed",
      priority: "high",
      createdAt: new Date('2024-01-15')
    },
    {
      id: 2,
      title: "Design responsive dashboard",
      description: "Create mobile-first responsive layout for admin panel",
      status: "in-progress",
      priority: "medium",
      createdAt: new Date('2024-01-20')
    },
    {
      id: 3,
      title: "Set up database schema",
      description: "Design and implement PostgreSQL database structure",
      status: "todo",
      priority: "high",
      createdAt: new Date('2024-01-25')
    }
  ]);

  const [newTask, setNewTask] = useState({ 
    title: '', 
    description: '', 
    priority: 'medium' as 'low' | 'medium' | 'high'
  });

  const addTask = () => {
    if (newTask.title.trim()) {
      const task: Task = {
        id: Date.now(),
        title: newTask.title,
        description: newTask.description,
        status: 'todo',
        priority: newTask.priority,
        createdAt: new Date()
      };
      setTasks([...tasks, task]);
      setNewTask({ title: '', description: '', priority: 'medium' });
    }
  };

  const updateTaskStatus = (id: number, status: Task['status']) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, status } : task));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Task Management System</h2>
        <p className="text-gray-600">Collaborative project management with real-time updates</p>
      </div>

      {/* Add Task Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus size={20} />
            Add New Task
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <input
            type="text"
            placeholder="Task title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Task description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
          <div className="flex gap-4 items-center">
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as 'low' | 'medium' | 'high' })}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <Button onClick={addTask} className="bg-blue-600 hover:bg-blue-700">
              Add Task
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tasks Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {['todo', 'in-progress', 'completed'].map((status) => (
          <div key={status} className="space-y-4">
            <h3 className="font-semibold text-lg capitalize text-gray-800 border-b pb-2">
              {status.replace('-', ' ')} ({tasks.filter(task => task.status === status).length})
            </h3>
            <div className="space-y-3">
              {tasks.filter(task => task.status === status).map((task) => (
                <Card key={task.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-gray-900">{task.title}</h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteTask(task.id)}
                        className="text-red-500 hover:text-red-700 h-6 w-6"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600">{task.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className={getStatusColor(task.status)}>
                        {task.status.replace('-', ' ')}
                      </Badge>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </div>
                    <div className="flex gap-2 pt-2">
                      {task.status !== 'completed' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateTaskStatus(task.id, task.status === 'todo' ? 'in-progress' : 'completed')}
                          className="text-xs"
                        >
                          {task.status === 'todo' ? 'Start' : 'Complete'}
                        </Button>
                      )}
                      <div className="flex items-center text-xs text-gray-500 ml-auto">
                        <Clock size={12} className="mr-1" />
                        {task.createdAt.toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Tech Stack Info */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-3">Technologies Used</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Frontend</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• React.js with TypeScript</li>
                <li>• Tailwind CSS for styling</li>
                <li>• Drag-and-drop functionality</li>
                <li>• Real-time state management</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Backend</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• Node.js with Express</li>
                <li>• PostgreSQL database</li>
                <li>• WebSocket for real-time updates</li>
                <li>• JWT authentication</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskManager;
