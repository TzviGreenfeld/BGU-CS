/*
 * **********************************************
 * Printing result depth
 *
 * You can enlarge it, if needed.
 * **********************************************
 */
maximum_printing_depth(100).

:- current_prolog_flag(toplevel_print_options, A),
   (select(max_depth(_), A, B), ! ; A = B),
   maximum_printing_depth(MPD),
   set_prolog_flag(toplevel_print_options, [max_depth(MPD)|B]).

% Signature: unique(List, UniqueList, Dups)/3
% Purpose: succeeds if and only if UniqueList contains the same elements of List without duplicates
% (according to their order in List), and Dups contains the duplicates


% in if x is in a given list
in(X, [H|T]) :-
    X=H; in(X, T).

% this function assume both lists unique
subset([], [H|T]).
subset([H|T], L) :-
    in(H, L),
    subset(T, L).

% dup test if X is in a list at least twice by finding the first occurence
% as the head and another in the tail
dup(X, [H|T]) :-
    X=H, in(X,T);
    dup(X, T).


% every item in [H|T] appears at least twice in L
alldups([], L).
alldups([H|T], L) :-
    dup(H,L),
    alldups(T, L).
    

% if list has unique values
isunique([]).
isunique([H|T]) :-
    not(in(H,T)),
    isunique(T).
    
% S is unique values of L
setoflist([],[]).
setoflist(S, L) :-
    isunique(S),
   	subset(S, L),
    subset(L,S).
    
    

unique(List, UniqueList, Dups) :-
    isunique(UniqueList),
    alldups(Dups, List),
    subset(List, UniqueList),
    subset(List, Dups),
    subset(UniqueList, List),
    subset(UniqueList, Dups),
    subset(Dups, List),
    subset(Dups, UniqueList).
    
    
    

    


    
