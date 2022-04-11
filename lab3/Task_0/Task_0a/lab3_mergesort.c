#include <stdio.h>
#include <stdlib.h>

int *slice(int *arr, int start, int end)
{
    int i;
    int *result = (int *)malloc((end - start) * sizeof(int));
    for (i = start; i < end; i++)
    {
        result[i - start] = arr[i];
    }
    return result;
}

void merge(int *result, int *left, int *right, int leftLen, int rightLen)
{
    int i = 0, j = 0;
    while (i < leftLen && j < rightLen)
    {
        if (left[i] < right[j])
        {
            result[i + j] = left[i];
            i++;
        }
        else
        {
            result[i + j] = right[j];
            j++;
        }
    }

    for (; i < leftLen; i++)
    {
        result[i + j] = left[i];
    }
    for (; j < rightLen; j++)
    {
        result[i + j] = right[j];
    }
}

void mergeSort(int *arr, int len)
{
    if (len <= 1)
    {
        return;
    }
    int *left = slice(arr, 0, len / 2 + 1);
    int *right = slice(arr, len / 2, len);

    mergeSort(left, len / 2 + 1);
    mergeSort(right, len - (len / 2));

    merge(arr, left, right, len / 2, len - (len / 2));
}

int main(int argc, char **argv)
{
    char **arr = argv + 1;
    int i, n = argc - 1;
    int *numbers = (int *)calloc(n, sizeof(int));

    printf("Original array:");
    for (i = 0; i <= n; ++i)
    {
        printf(" %s", arr[i]);
        numbers[i] = atoi(arr[i]);
    }
    printf("\n");

    mergeSort(numbers, n);

    printf("Sorted array:");
    for (i = 0; i <= n; ++i)
        printf(" %d", numbers[i]);
    printf("\n");

    return 0;
}