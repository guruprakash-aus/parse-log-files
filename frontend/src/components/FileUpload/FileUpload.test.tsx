import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FileUpload } from './index';

describe('FileUpload', () => {
  it('renders upload area', () => {
    render(<FileUpload onFileSelect={vi.fn()} isLoading={false} />);
    expect(screen.getByText(/drag and drop/i)).toBeInTheDocument();
  });

  it('calls onFileSelect when file is selected', () => {
    const mockOnFileSelect = vi.fn();
    render(<FileUpload onFileSelect={mockOnFileSelect} isLoading={false} />);

    const file = new File(['test content'], 'test.log', { type: 'text/plain' });
    const input = screen.getByTestId('file-input');
    
    fireEvent.change(input, { target: { files: [file] } });
    
    expect(mockOnFileSelect).toHaveBeenCalledWith(file);
  });

  it('disables input when loading', () => {
    render(<FileUpload onFileSelect={vi.fn()} isLoading={true} />);
    const input = screen.getByTestId('file-input');
    expect(input).toBeDisabled();
  });
});