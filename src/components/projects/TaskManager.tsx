
import React, { useState, useEffect } from 'react';
import { Plus, Check, Trash2, Clock, Users, Filter, Search, Calendar, Tag, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  dueDate: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface TeamMember {
  id: number;
  name: string;
  avatar: string;
  role: string;
}

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Implement user authentication",
      description: "Add login/signup functionality with JWT tokens and password hashing",
      status: "completed",
      priority: "high",
      assignee: "John Doe",
      dueDate: "2024-01-30",
      tags: ["authentication", "security", "backend"],
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-28')
    },
    {
      id: 2,
      title: "Design responsive dashboard",
      description: "Create mobile-first responsive layout for admin panel with dark mode support",
      status: "in-progress",
      priority: "medium",
      assignee: "Jane Smith",
      dueDate: "2024-02-05",
      tags: ["ui", "responsive", "design"],
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date('2024-01-25')
    },
    {
      id: 3,
      title: "Set up database schema",
      description: "Design and implement PostgreSQL database structure with proper indexing",
      status: "todo",
      priority: "high",
      assignee: "Mike Johnson",
      dueDate: "2024-02-10",
      tags: ["database", "backend", "postgresql"],
      createdAt: new Date('2024-01-25'),
      updatedAt: new Date('2024-01-25')
    },
    {
      id: 4,
      title: "Implement real-time notifications",
      description: "Add WebSocket-based real-time notifications for task updates",
      status: "todo",
      priority: "medium",
      assignee: "Sarah Wilson",
      dueDate: "2024-02-15",
      tags: ["websocket", "notifications", "real-time"],
      createdAt: new Date('2024-01-26'),
      updatedAt: new Date('2024-01-26')
    }
  ]);

  const [teamMembers] = useState<TeamMember[]>([
    { id: 1, name: "John Doe", avatar: "JD", role: "Frontend Developer" },
    { id: 2, name: "Jane Smith", avatar: "JS", role: "UI/UX Designer" },
    { id: 3, name: "Mike Johnson", avatar: "MJ", role: "Backend Developer" },
    { id: 4, name: "Sarah Wilson", avatar: "SW", role: "Full Stack Developer" }
  ]);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    assignee: '',
    dueDate: '',
    tags: [] as string[]
  });

  const [filter, setFilter] = useState({
    status: 'all',
    priority: 'all',
    assignee: 'all',
    search: ''
  });

  const [currentTag, setCurrentTag] = useState('');
  const [showStats, setShowStats] = useState(false);

  const addTask = () => {
    if (newTask.title.trim()) {
      const task: Task = {
        id: Date.now(),
        title: newTask.title,
        description: newTask.description,
        status: 'todo',
        priority: newTask.priority,
        assignee: newTask.assignee,
        dueDate: newTask.dueDate,
        tags: newTask.tags,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setTasks([...tasks, task]);
      setNewTask({
        title: '',
        description: '',
        priority: 'medium',
        assignee: '',
        dueDate: '',
        tags: []
      });
    }
  };

  const updateTaskStatus = (id: number, status: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status, updatedAt: new Date() } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addTag = () => {
    if (currentTag.trim() && !newTask.tags.includes(currentTag.trim())) {
      setNewTask({
        ...newTask,
        tags: [...newTask.tags, currentTag.trim()]
      });
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewTask({
      ...newTask,
      tags: newTask.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filter.status === 'all' || task.status === filter.status;
    const matchesPriority = filter.priority === 'all' || task.priority === filter.priority;
    const matchesAssignee = filter.assignee === 'all' || task.assignee === filter.assignee;
    const matchesSearch = task.title.toLowerCase().includes(filter.search.toLowerCase()) ||
                         task.description.toLowerCase().includes(filter.search.toLowerCase());
    
    return matchesStatus && matchesPriority && matchesAssignee && matchesSearch;
  });

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

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const inProgress = tasks.filter(t => t.status === 'in-progress').length;
    const todo = tasks.filter(t => t.status === 'todo').length;
    const overdue = tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'completed').length;

    return { total, completed, inProgress, todo, overdue };
  };

  const stats = getTaskStats();

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Task Management System</h2>
        <p className="text-gray-600">Collaborative project management with real-time updates and team collaboration</p>
      </div>

      {/* Statistics Dashboard */}
      <div className="grid md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Tasks</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.inProgress}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-600">{stats.todo}</div>
            <div className="text-sm text-gray-600">To Do</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
            <div className="text-sm text-gray-600">Overdue</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter size={20} />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={filter.search}
                onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <select
              value={filter.priority}
              onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <select
              value={filter.assignee}
              onChange={(e) => setFilter({ ...filter, assignee: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Assignees</option>
              {teamMembers.map(member => (
                <option key={member.id} value={member.name}>{member.name}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Add Task Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus size={20} />
            Add New Task
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Task title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={newTask.assignee}
              onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Assignee</option>
              {teamMembers.map(member => (
                <option key={member.id} value={member.name}>{member.name}</option>
              ))}
            </select>
          </div>
          
          <textarea
            placeholder="Task description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
          
          <div className="grid md:grid-cols-3 gap-4">
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as 'low' | 'medium' | 'high' })}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            
            <input
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add tag"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button onClick={addTag} size="sm" variant="outline">
                <Tag size={16} />
              </Button>
            </div>
          </div>
          
          {newTask.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {newTask.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <button onClick={() => removeTag(tag)} className="ml-1 text-red-500">×</button>
                </Badge>
              ))}
            </div>
          )}
          
          <Button onClick={addTask} className="bg-blue-600 hover:bg-blue-700">
            Add Task
          </Button>
        </CardContent>
      </Card>

      {/* Tasks Kanban Board */}
      <div className="grid md:grid-cols-3 gap-6">
        {['todo', 'in-progress', 'completed'].map((status) => (
          <div key={status} className="space-y-4">
            <h3 className="font-semibold text-lg capitalize text-gray-800 border-b pb-2 flex items-center justify-between">
              <span>{status.replace('-', ' ')}</span>
              <Badge variant="outline">
                {filteredTasks.filter(task => task.status === status).length}
              </Badge>
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredTasks.filter(task => task.status === status).map((task) => (
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
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Users size={14} />
                      <span>{task.assignee}</span>
                    </div>
                    
                    {task.dueDate && (
                      <div className={`flex items-center gap-2 text-sm ${
                        new Date(task.dueDate) < new Date() && task.status !== 'completed' 
                          ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        <Calendar size={14} />
                        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-1">
                      {task.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
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
                        {task.updatedAt.toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Team Members */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users size={20} />
            Team Members
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                  {member.avatar}
                </div>
                <div>
                  <div className="font-medium">{member.name}</div>
                  <div className="text-sm text-gray-600">{member.role}</div>
                  <div className="text-xs text-gray-500">
                    {tasks.filter(t => t.assignee === member.name).length} tasks
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tech Stack Info */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-3">Technologies & Features</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Frontend</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• React.js with TypeScript</li>
                <li>• Tailwind CSS for styling</li>
                <li>• Drag-and-drop functionality</li>
                <li>• Real-time state management</li>
                <li>• Advanced filtering & search</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Backend</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• Node.js with Express</li>
                <li>• PostgreSQL database</li>
                <li>• WebSocket for real-time updates</li>
                <li>• JWT authentication</li>
                <li>• RESTful API design</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Features</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• Team collaboration</li>
                <li>• Task assignment & tracking</li>
                <li>• Due date management</li>
                <li>• Tag-based organization</li>
                <li>• Progress analytics</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskManager;
